type MailEnv = {
  [key: string]: string | undefined;
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  NEXT_PUBLIC_CONTACT_EMAIL?: string;
};
export function mailConfig(env: MailEnv) {
  const apiKey = env.RESEND_API_KEY?.trim() || "";
  const rawFrom = env.CONTACT_FROM_EMAIL?.trim() || "";
  const from =
    rawFrom && !rawFrom.includes("<") ? `MAHONEGA <${rawFrom}>` : rawFrom;
  const to =
    env.CONTACT_TO_EMAIL?.trim() ||
    env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
    "contacto@mahonega.com";
  return { apiKey, from, to, configured: !!(apiKey && from) };
}
