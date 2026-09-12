import { createHash } from "node:crypto";
import { deliverContact } from "@/lib/delivery";
import { mailConfig } from "@/lib/mail-config";
import { createContactHandler } from "@/lib/contact-handler";
import { createMemoryLimiter } from "@/lib/contact";
export const runtime = "nodejs";
const globalState = globalThis as typeof globalThis & {
  mahonegaLimit?: ReturnType<typeof createMemoryLimiter>;
};
const localLimit = (globalState.mahonegaLimit ??= createMemoryLimiter());
export const POST = createContactHandler({
  // Next can reconstruct an internal URL behind the development/hosting proxy.
  // Compare against explicit public origins, never visitor-supplied forwarding headers.
  allowedOrigins: process.env.NEXT_PUBLIC_SITE_URL
    ? [new URL(process.env.NEXT_PUBLIC_SITE_URL).origin]
    : ["http://127.0.0.1:3010", "http://localhost:3010"],
  configured: () => mailConfig(process.env).configured,
  allow: async (request) => {
    // Trust proxy headers only on a deployment whose proxy overwrites them.
    const identity =
      process.env.TRUST_PROXY === "true"
        ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          "unknown"
        : "shared";
    const key =
      "mahonega:contact:" + createHash("sha256").update(identity).digest("hex");
    const url = process.env.UPSTASH_REDIS_REST_URL,
      token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (url && token) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          "EVAL",
          "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],600) end; return n",
          "1",
          key,
        ]),
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) throw new Error("Rate service failed");
      const body = await response.json();
      if (typeof body.result !== "number")
        throw new Error("Invalid rate result");
      return body.result <= 5;
    }
    return localLimit(key);
  },
  send: (data) => deliverContact(data, process.env),
});
