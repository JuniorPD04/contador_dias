// Adelanto de lo que vendrá: una galería de fotos. Por ahora solo el
// anuncio, para no dejar la sección vacía mientras se prepara el contenido.
export default function UsSection() {
  return (
    <div
      className="mx-auto w-full max-w-sm animate-fade-up rounded-2xl border border-paper-100/10 bg-ink-900/70 px-5 py-4 backdrop-blur-sm"
      style={{ animationDelay: "200ms" }}
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-400">
          nosotros
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-paper-400/60">
          próximamente
        </p>
      </div>
      <p className="mt-2 font-body text-[13px] leading-snug text-paper-100/80">
        Aún lo estoy preparando, mi amor. Pronto esto va a ser una galería con
        nuestras fotos.
      </p>
    </div>
  );
}
