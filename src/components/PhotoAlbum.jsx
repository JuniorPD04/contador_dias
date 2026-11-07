import { useEffect, useRef, useState } from "react";

// Vite incluye las fotos de esta carpeta en el build, también al desplegar.
const photoFiles = import.meta.glob("../../fotos_juntos/*.{jpeg,jpg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});
const photos = Object.entries(photoFiles)
  .sort(([a], [b]) => a.localeCompare(b, "es", { numeric: true }))
  .map(([, src], index) => ({ src, alt: `Nuestro recuerdo juntos ${index + 1}` }));

export default function PhotoAlbum() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!selectedPhoto) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedPhoto]);

  return (
    <main className="relative z-10 mx-auto min-h-[100dvh] max-w-3xl px-5 py-[max(1.5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))]">
      <a href="#contador" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm text-paper-300 transition hover:text-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400">
        <span aria-hidden="true">←</span> Volver al contador
      </a>
      <header className="mb-8 mt-7 text-center">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-rose-400">nuestro álbum</p>
        <h1 id="album-title" tabIndex={-1} className="font-display text-3xl font-semibold leading-tight text-paper-100 outline-none sm:text-4xl">Por más momentos así</h1>
        <p className="mt-3 text-sm text-paper-300">Tú, yo y tantos recuerdos por guardar.</p>
      </header>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {photos.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setSelectedPhoto(photo)}
            aria-label={`Ampliar foto ${index + 1} de ${photos.length}`}
            className="group rounded-xl border border-paper-100/10 bg-ink-900 p-1.5 shadow-lg transition hover:-translate-y-1 hover:border-rose-400/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-400"
          >
            <img src={photo.src} alt={photo.alt} loading={index < 4 ? "eager" : "lazy"} decoding="async" className="aspect-[3/4] w-full rounded-lg object-cover" />
            <span aria-hidden="true" className="block py-2 font-mono text-[9px] tracking-[0.2em] text-paper-400">
              {String(index + 1).padStart(2, "0")} <span className="text-rose-400">♥</span>
            </span>
          </button>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-paper-400">Y todos los que nos faltan vivir…</p>
      <dialog
        ref={dialogRef}
        aria-label="Foto ampliada"
        onClose={() => setSelectedPhoto(null)}
        onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current.close(); }}
        className="m-auto max-h-[95dvh] w-[calc(100%-2rem)] max-w-3xl overflow-auto rounded-2xl border border-paper-100/20 bg-ink-950 p-3 text-paper-100 backdrop:bg-ink-950/95"
      >
        <form method="dialog" className="mb-3 flex justify-end">
          <button autoFocus className="min-h-11 rounded-lg border border-paper-100/20 px-4 text-sm transition hover:border-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-400">Cerrar foto ×</button>
        </form>
        {selectedPhoto && <img src={selectedPhoto.src} alt={selectedPhoto.alt} className="mx-auto max-h-[75dvh] w-auto max-w-full rounded-lg object-contain" />}
      </dialog>
    </main>
  );
}
