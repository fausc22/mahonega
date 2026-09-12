import { contactSchema, type ContactData } from "./contact.ts";
type Services = {
  allowedOrigins?: string[];
  configured: () => boolean;
  allow: (request: Request) => Promise<boolean>;
  send: (data: ContactData) => Promise<void>;
  now?: () => number;
};
const json = (error: string, status: number) =>
  Response.json(
    { error },
    { status, headers: status === 429 ? { "Retry-After": "600" } : {} },
  );
export function createContactHandler(services: Services) {
  return async (request: Request) => {
    const origin = request.headers.get("origin");
    const allowedOrigins = services.allowedOrigins ?? [
      new URL(request.url).origin,
    ];
    if (origin && !allowedOrigins.includes(origin))
      return json("invalid_origin", 403);
    if (
      !request.headers
        .get("content-type")
        ?.toLowerCase()
        .startsWith("application/json")
    )
      return json("invalid_content_type", 415);
    if (Number(request.headers.get("content-length") || 0) > 16000)
      return json("request_too_large", 413);
    let payload: unknown;
    try {
      const reader = request.body?.getReader();
      if (!reader) return json("invalid_request", 400);
      let bytes = 0;
      const chunks: Uint8Array[] = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > 16000) {
          await reader.cancel();
          return json("request_too_large", 413);
        }
        chunks.push(value);
      }
      const all = new Uint8Array(bytes);
      let pos = 0;
      for (const chunk of chunks) {
        all.set(chunk, pos);
        pos += chunk.byteLength;
      }
      payload = JSON.parse(new TextDecoder().decode(all));
    } catch {
      return json("invalid_request", 400);
    }
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) return json("invalid_data", 422);
    const age = (services.now?.() ?? Date.now()) - parsed.data.startedAt;
    if (age < 800 || age > 86400000) return json("form_expired", 422);
    if (!services.configured()) return json("service_not_configured", 503);
    try {
      if (!(await services.allow(request))) return json("rate_limited", 429);
    } catch {
      return json("temporarily_unavailable", 503);
    }
    try {
      await services.send(parsed.data);
      return Response.json({ ok: true });
    } catch {
      return json("delivery_failed", 502);
    }
  };
}
