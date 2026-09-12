"use client";
import Link from "next/link";
import { FormSelect } from "./FormSelect";
import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { contactSchema } from "@/lib/contact";
import { whatsappUrl } from "@/lib/site";
import { ContactLink, track } from "./ContactLink";
export function LeadForm({ context = "" }: { context?: string }) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState("");
  const startedAt = useRef(0);
  const tracked = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  function start() {
    if (!startedAt.current) startedAt.current = Date.now();
    if (!tracked.current) {
      track("contact_form_start", { context: context || "general" });
      tracked.current = true;
    }
  }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = {
      ...Object.fromEntries(new FormData(form)),
      startedAt: startedAt.current || Date.now() - 1000,
    };
    const result = contactSchema.safeParse(data);
    setErrors({});
    setFeedback("");
    if (!result.success) {
      const fields: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const name = String(issue.path[0]);
        fields[name] ??= issue.message;
      }
      setErrors(fields);
      setStatus("idle");
      const first = Object.keys(fields)[0];
      (form.elements.namedItem(first) as HTMLElement)?.focus();
      return;
    }
    setStatus("sending");
    track("contact_form_submit", { context: context || "general" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
        signal: AbortSignal.timeout(20000),
      });
      if (response.ok) {
        setStatus("success");
        track("generate_lead", {
          context: context || "general",
          intent: result.data.intent,
        });
        form.reset();
        return;
      }
      const body = await response.json().catch(() => ({}));
      const messages: Record<string, string> = {
        service_not_configured:
          "El envío por formulario todavía no está habilitado. No se envió tu consulta. Podés comunicarte con el equipo por WhatsApp o teléfono.",
        rate_limited:
          "Recibimos varios intentos de envío. Esperá unos minutos o escribinos por WhatsApp.",
        form_expired:
          "Por favor, intentá enviar nuevamente. Si tenías esta página abierta hace mucho, actualizala después de copiar tu mensaje.",
      };
      setFeedback(
        messages[body.error] ||
          "No pudimos enviar tu consulta. Tus datos siguen en el formulario; podés volver a intentarlo o escribirnos por WhatsApp.",
      );
      if (body.error === "form_expired") startedAt.current = Date.now() - 1000;
      track("contact_form_error", { reason: body.error || "unknown" });
      setStatus("error");
    } catch {
      setFeedback(
        "No pudimos confirmar el envío. Revisá tu conexión y volvé a intentarlo. Tus datos siguen en el formulario.",
      );
      setStatus("error");
      track("contact_form_error", { reason: "network" });
    }
  }
  const field = (name: string) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    disabled: status === "sending",
  });
  const error = (name: string) =>
    errors[name] ? (
      <span className="field-error" id={`${name}-error`}>
        {errors[name]}
      </span>
    ) : null;
  if (status === "success")
    return (
      <div className="form-success" role="status" aria-live="polite">
        <CheckCircle2 size={44} />
        <p className="eyebrow">GRACIAS POR CONTACTARNOS</p>
        <h2>Consulta enviada.</h2>
        <p>
          El equipo podrá responderte por el teléfono o correo que nos dejaste.
        </p>
        <button
          className="button"
          onClick={() => {
            setStatus("idle");
            startedAt.current = 0;
            tracked.current = false;
          }}
        >
          Enviar otra consulta <ArrowUpRight size={18} />
        </button>
      </div>
    );
  return (
    <form
      ref={formRef}
      className="lead-form"
      onSubmit={submit}
      onFocus={start}
      noValidate
      aria-busy={status === "sending"}
    >
      <div className="form-heading">
        <p className="eyebrow">ESCRIBINOS</p>
        <h2>Contanos qué necesitás.</h2>
        <p>Dejanos un teléfono o correo para que podamos responderte.</p>
      </div>
      {context && (
        <div className="context-chip">
          <span>Tu consulta</span>
          <strong>{context}</strong>
        </div>
      )}
      <input type="hidden" name="context" value={context} />
      <div className="honeypot" aria-hidden="true">
        <label>
          Dejar vacío
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-row">
        <div className="field-group">
          <label htmlFor="name">
            Nombre y apellido <span>*</span>
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            maxLength={100}
            required
            {...field("name")}
          />
          {error("name")}
        </div>
        <div className="field-group">
          <label htmlFor="location">
            Localidad y provincia <span>*</span>
          </label>
          <input
            id="location"
            name="location"
            autoComplete="address-level2"
            maxLength={120}
            required
            {...field("location")}
          />
          {error("location")}
        </div>
      </div>
      <div className="form-row">
        <div className="field-group">
          <label htmlFor="phone">Teléfono / WhatsApp</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            {...field("phone")}
          />
          {error("phone")}
        </div>
        <div className="field-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={160}
            {...field("email")}
          />
          {error("email")}
        </div>
      </div>
      <div className="field-group">
        <label id="intent-label" htmlFor="intent">
          Motivo de consulta <span>*</span>
        </label>
        <FormSelect
          defaultValue={
            context.includes("entrega")
              ? "entregas"
              : context.includes("asesoramiento")
                ? "asesoramiento"
                : "productos"
          }
          disabled={status === "sending"}
          error={errors.intent}
        />
        {error("intent")}
      </div>
      <div className="field-group">
        <label htmlFor="message">
          Mensaje <span>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={3000}
          required
          placeholder="Por ejemplo: producto que buscás, presentación o cantidad y tu zona de entrega."
          {...field("message")}
        />
        {error("message")}
      </div>
      <p className="form-privacy">
        Usaremos tus datos para responder esta consulta. Conocé nuestra{" "}
        <Link href="/privacidad">política de privacidad</Link>.
      </p>
      {status === "error" && (
        <div className="form-feedback" role="alert">
          <p>{feedback}</p>
          <ContactLink
            href={whatsappUrl(context)}
            event="contact_whatsapp_click"
            context="form_error"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Continuar por WhatsApp <ArrowUpRight size={17} />
          </ContactLink>
        </div>
      )}
      <div className="form-submit">
        <button
          className="button"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <LoaderCircle className="spinner" size={18} />
          ) : (
            <Send size={18} />
          )}{" "}
          {status === "sending" ? "Enviando consulta…" : "Enviar consulta"}
        </button>
        <span>* Campos obligatorios</span>
      </div>
    </form>
  );
}
