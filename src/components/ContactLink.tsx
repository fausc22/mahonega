"use client";
import type { AnchorHTMLAttributes } from "react";
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event?: string;
  context?: string;
};
export function track(name: string, detail: Record<string, string> = {}) {
  window.dispatchEvent(
    new CustomEvent("mahonega:analytics", {
      detail: { event: name, ...detail },
    }),
  );
  const runtime = window as Window & { gtag?: (...args: unknown[]) => void };
  runtime.gtag?.("event", name, detail);
}
export function ContactLink({
  event = "contact_click",
  context = "general",
  onClick,
  ...props
}: Props) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, { context });
        onClick?.(e);
      }}
    />
  );
}
