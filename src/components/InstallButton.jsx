import { useEffect, useState } from "react";
import { isIos, isStandalone } from "../hooks/pwa";

// Botón flotante único para instalar la app. En Chrome/Android/Edge usa el
// evento "beforeinstallprompt" y dispara el diálogo nativo directamente.
// En iOS/Safari, que no soporta ese evento, el mismo botón abre una tarjeta
// con los dos toques manuales (Compartir → Agregar a inicio). En ambos
// casos desaparece en cuanto la app queda instalada (modo standalone).
export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [showIosHelp, setShowIosHelp] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    const handleInstalled = () => {
      setDeferredPrompt(null);
      setInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    window.addEventListener("appinstalled", handleInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  if (installed || isStandalone()) return null;
  if (!deferredPrompt && !isIos()) return null;

  const install = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    } else {
      setShowIosHelp(true);
    }
  };

  return (
    <>
      <button
        onClick={install}
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex items-center gap-2 rounded-full bg-rose-500 px-5 py-3 font-body text-sm font-medium text-ink-950 shadow-glow transition hover:bg-rose-400"
      >
        ⬇️ Instalar app
      </button>

      {showIosHelp && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink-950/60 px-5 pb-28 backdrop-blur-sm sm:items-center sm:pb-5"
          onClick={() => setShowIosHelp(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-teal-400/25 bg-ink-900 px-5 py-4 shadow-glow"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-body text-sm text-paper-100/90">
              Toca <span className="font-semibold">Compartir</span> (el ícono
              del cuadrito con la flecha) y luego{" "}
              <span className="font-semibold">"Agregar a inicio"</span>.
            </p>
            <button
              onClick={() => setShowIosHelp(false)}
              className="mt-3 font-mono text-[10px] uppercase tracking-wider text-paper-400/70 underline underline-offset-2"
            >
              entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
}
