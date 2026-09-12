import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section">
      <div className="container not-found">
        <p className="eyebrow">PÁGINA NO ENCONTRADA · 404</p>
        <h1>Volvamos al camino.</h1>
        <p>
          No encontramos esta página. Podés explorar nuestros productos o
          comunicarte con el equipo.
        </p>
        <Link href="/" className="button">
          Volver al inicio
        </Link>
        <Link href="/productos" className="text-link">
          Ver productos
        </Link>
      </div>
    </section>
  );
}
