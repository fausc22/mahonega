"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
const links = [
  { href: "/productos", label: "Productos" },
  { href: "/empresa", label: "Empresa" },
  { href: "/contacto", label: "Contacto" },
];
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panel.current?.querySelector<HTMLAnchorElement>("a");
    first?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const items = [
          toggle.current,
          ...Array.from(
            panel.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const index = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && index <= 0) {
          e.preventDefault();
          items.at(-1)?.focus();
        } else if (!e.shiftKey && index === items.length - 1) {
          e.preventDefault();
          items[0]?.focus();
        }
      }
    }
    function resize() {
      if (window.innerWidth >= 800) setOpen(false);
    }
    window.addEventListener("keydown", key);
    window.addEventListener("resize", resize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", key);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          title="Ir al inicio de MAHONEGA"
          onClick={() => setOpen(false)}
        >
          <span className="brand-symbol">
            <Image
              src="/brand/monograma.png"
              alt=""
              width={75}
              height={45}
              priority
            />
          </span>
          <span className="brand-copy">
            MAHONEGA <span>INSUMOS VETERINARIOS</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/contacto" className="button button-small header-cta">
          Contactanos <ArrowUpRight size={17} />
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          <span className="menu-bars" data-open={open} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
      <div
        id="mobile-menu"
        className="mobile-menu"
        ref={panel}
        data-open={open}
        inert={!open}
        aria-hidden={!open}
      >
        <nav aria-label="Navegación móvil">
          <Link href="/" onClick={() => setOpen(false)}>
            Inicio
          </Link>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
              <ArrowUpRight />
            </Link>
          ))}
        </nav>
        <p>
          Insumos veterinarios.
          <br />
          Cerca de tu establecimiento.
        </p>
      </div>
    </header>
  );
}
