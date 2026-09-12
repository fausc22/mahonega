import { Resend } from "resend";
import { contactEmail, type ContactData } from "./contact.ts";
import { mailConfig } from "./mail-config.ts";
export async function deliverContact(
  data: ContactData,
  env: Record<string, string | undefined>,
) {
  const config = mailConfig(env);
  if (!config.configured) throw new Error("Mail service not configured");
  const result = await new Resend(config.apiKey).emails.send({
    from: config.from,
    to: [config.to],
    ...(data.email ? { replyTo: data.email } : {}),
    tags: [{ name: "intent", value: data.intent }],
    ...contactEmail(data),
  });
  if (result.error || !result.data?.id) throw new Error("Delivery failed");
}
