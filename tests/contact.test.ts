import { test } from "node:test";
import assert from "node:assert/strict";
import {
  contactSchema,
  contactEmail,
  createMemoryLimiter,
} from "../src/lib/contact.ts";
import { createContactHandler } from "../src/lib/contact-handler.ts";
const now = 1800000000000;
const data = {
  name: "Prueba MAHONEGA",
  location: "Huinca Renancó, Córdoba",
  phone: "2302635250",
  email: "",
  intent: "productos" as const,
  context: "Biomeq",
  message: "Consulta técnica de prueba, sin envío real.",
  website: "",
  startedAt: now - 2000,
};
function request(body: unknown = data, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}
test("accepts phone-only and email-only; rejects missing reply channel and invalid supplied values", () => {
  assert.equal(contactSchema.safeParse(data).success, true);
  assert.equal(
    contactSchema.safeParse({ ...data, phone: "", email: "qa@example.com" })
      .success,
    true,
  );
  assert.equal(
    contactSchema.safeParse({ ...data, phone: "", email: "" }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({ ...data, phone: "abc12345678" }).success,
    false,
  );
  assert.equal(
    contactSchema.safeParse({ ...data, email: "bad" }).success,
    false,
  );
});
test("unconfigured service never claims success or calls delivery", async () => {
  let sent = false;
  const handler = createContactHandler({
    configured: () => false,
    allow: async () => true,
    send: async () => {
      sent = true;
    },
    now: () => now,
  });
  assert.equal((await handler(request())).status, 503);
  assert.equal(sent, false);
});
test("valid delivery preserves selected product; provider failure is not success", async () => {
  let context = "";
  const handler = createContactHandler({
    configured: () => true,
    allow: async () => true,
    send: async (d) => {
      context = d.context;
    },
    now: () => now,
  });
  assert.equal((await handler(request())).status, 200);
  assert.equal(context, "Biomeq");
  const failed = createContactHandler({
    configured: () => true,
    allow: async () => true,
    send: async () => {
      throw Error("offline");
    },
    now: () => now,
  });
  assert.equal((await failed(request())).status, 502);
});
test("rejects spam, invalid origin, too-fast and expired forms before delivery", async () => {
  let sent = 0;
  const handler = createContactHandler({
    configured: () => true,
    allow: async () => true,
    send: async () => {
      sent++;
    },
    now: () => now,
  });
  for (const body of [
    { ...data, website: "bot" },
    { ...data, startedAt: now },
    { ...data, startedAt: now - 90000000 },
    { ...data, message: "" },
  ])
    assert.equal((await handler(request(body))).status, 422);
  assert.equal(
    (await handler(request(data, { Origin: "https://untrusted.example" })))
      .status,
    403,
  );
  assert.equal(sent, 0);
});
test("rate limits and oversized/malformed bodies are handled explicitly", async () => {
  const handler = createContactHandler({
    configured: () => true,
    allow: async () => false,
    send: async () => {},
    now: () => now,
  });
  assert.equal((await handler(request())).status, 429);
  assert.equal(
    (await handler(request({ ...data, message: "á".repeat(9000) }))).status,
    413,
  );
  assert.equal(
    (
      await handler(
        new Request("http://localhost/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "{bad",
        }),
      )
    ).status,
    400,
  );
  assert.equal(
    (await handler(request(data, { "Content-Type": "text/plain" }))).status,
    415,
  );
});
test("limiter resets after the window and email escapes all visitor content", () => {
  let clock = now;
  const limit = createMemoryLimiter(() => clock);
  for (let i = 0; i < 5; i++) assert.equal(limit("one"), true);
  assert.equal(limit("one"), false);
  assert.equal(limit("two"), true);
  clock += 600001;
  assert.equal(limit("one"), true);
  const mail = contactEmail({
    ...data,
    message: "<img src=x onerror=alert(1)>",
  });
  assert.ok(!mail.html.includes("<img"));
  assert.ok(mail.html.includes("&lt;img"));
  assert.ok(mail.text.includes("<img"));
});

test("explicit public origin works behind a proxy and still rejects foreign origins", async () => {
  const handler = createContactHandler({
    allowedOrigins: ["https://mahonega.example"],
    configured: () => false,
    allow: async () => true,
    send: async () => {},
    now: () => now,
  });
  assert.equal(
    (await handler(request(data, { Origin: "https://mahonega.example" })))
      .status,
    503,
  );
  assert.equal(
    (await handler(request(data, { Origin: "https://foreign.example" })))
      .status,
    403,
  );
});

test("Resend configuration mirrors HT with a named sender and configurable recipient", async () => {
  const { mailConfig } = await import("../src/lib/mail-config.ts");
  assert.equal(mailConfig({}).configured, false);
  assert.deepEqual(
    mailConfig({
      RESEND_API_KEY: " test ",
      CONTACT_FROM_EMAIL: "web@mahonega.com",
    }),
    {
      apiKey: "test",
      from: "MAHONEGA <web@mahonega.com>",
      to: "contacto@mahonega.com",
      configured: true,
    },
  );
  assert.equal(
    mailConfig({ CONTACT_TO_EMAIL: "qa@example.com" }).to,
    "qa@example.com",
  );
  assert.equal(
    mailConfig({ CONTACT_FROM_EMAIL: "Equipo <web@mahonega.com>" }).from,
    "Equipo <web@mahonega.com>",
  );
  const mail = contactEmail({ ...data, email: "qa@example.com" });
  assert.ok(mail.html.includes("mailto:qa%40example.com"));
  assert.ok(mail.html.includes("Nueva consulta web"));
  assert.ok(
    mail.html.includes("Consulta recibida desde el formulario web de MAHONEGA."),
  );
  assert.ok(mail.subject.includes("Productos y disponibilidad"));
});

test("real Resend adapter builds sender, recipient and reply-to, and rejects API failures", async (t) => {
  const { deliverContact } = await import("../src/lib/delivery.ts");
  let payload: Record<string, unknown> = {};
  let responseStatus = 200;
  t.mock.method(
    globalThis,
    "fetch",
    async (_url: unknown, init?: RequestInit) => {
      payload = JSON.parse(String(init?.body));
      return new Response(
        JSON.stringify(
          responseStatus === 200
            ? { id: "local-test-id" }
            : { name: "validation_error", message: "Mock rejection" },
        ),
        {
          status: responseStatus,
          headers: { "Content-Type": "application/json" },
        },
      );
    },
  );
  const env = {
    RESEND_API_KEY: "re_local_test",
    CONTACT_FROM_EMAIL: "web@mahonega.com",
    CONTACT_TO_EMAIL: "qa@example.com",
  };
  await deliverContact({ ...data, email: "visitor@example.com" }, env);
  assert.equal(payload.from, "MAHONEGA <web@mahonega.com>");
  assert.deepEqual(payload.to, ["qa@example.com"]);
  assert.equal(payload.reply_to, "visitor@example.com");
  assert.ok(String(payload.html).includes("Biomeq"));
  await deliverContact(data, env);
  assert.equal(payload.reply_to, undefined);
  responseStatus = 422;
  await assert.rejects(deliverContact(data, env), /Delivery failed/);
});
