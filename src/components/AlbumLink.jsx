export default function AlbumLink() {
  return (
    <a
      id="album-link"
      href="#album"
      className="group mx-auto flex w-full max-w-sm items-center gap-4 rounded-2xl border border-paper-100/10 bg-ink-900/70 px-5 py-4 text-paper-100 transition hover:border-rose-400/50 hover:bg-ink-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-400"
    >
      <span aria-hidden="true" className="text-2xl">📷</span>
      <span className="flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-rose-400">nuestro álbum</span>
        <span className="mt-1 block text-sm text-paper-300">Un pedacito de nosotros</span>
      </span>
      <span aria-hidden="true" className="text-xl text-rose-400 transition-transform group-hover:translate-x-1">→</span>
    </a>
  );
}
