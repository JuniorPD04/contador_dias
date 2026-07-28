import { useEffect, useState } from "react";

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

// Botón flotante que aparece solo cuando el navegador (Chrome/Android,
// Edge, desktop) dispara "beforeinstallprompt". Al tocarlo lanza el diálogo
// nativo de instalación directa, sin pasos manuales. iOS/Safari no soporta
// este evento, por eso ahí sigue apareciendo el InstallHint con las
// instrucciones de "Compartir → Agregar a inicio".
export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

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

  if (!deferredPrompt || installed) return null;

  const install = async () => {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  return (
    <button
      onClick={install}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 flex items-center gap-2 rounded-full bg-rose-500 px-5 py-3 font-body text-sm font-medium text-ink-950 shadow-glow transition hover:bg-rose-400"
    >
      ⬇️ Instalar app
    </button>
  );
}
