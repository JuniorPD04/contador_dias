import { useEffect, useState } from "react";

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

// iOS Safari no dispara "beforeinstallprompt" como Chrome/Android, así que
// la única forma de "instalar" es indicarle a mano: Compartir → Agregar a
// pantalla de inicio. Este aviso solo aparece si está en Safari/iOS y la
// app todavía NO fue agregada a inicio.
export default function InstallHint() {
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem("install-hint-dismissed") === "1"
  );
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isIos() && !isStandalone());
  }, []);

  if (!show || dismissed) return null;

  const dismiss = () => {
    localStorage.setItem("install-hint-dismissed", "1");
    setDismissed(true);
  };

  return (
    <div className="mx-auto w-full max-w-sm animate-fade-up rounded-2xl border border-teal-400/25 bg-teal-500/10 px-5 py-4">
      <p className="font-body text-sm text-paper-100/90">
        Guarda esta app en tu pantalla de inicio: toca{" "}
        <span className="font-semibold">Compartir</span> (el ícono del
        cuadrito con la flecha) y luego{" "}
        <span className="font-semibold">"Agregar a inicio"</span>.
      </p>
      <button
        onClick={dismiss}
        className="mt-2 font-mono text-[10px] uppercase tracking-wider text-paper-400/70 underline underline-offset-2"
      >
        entendido
      </button>
    </div>
  );
}
