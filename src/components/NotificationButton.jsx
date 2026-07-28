import { useEffect, useState } from "react";
import { ANNIVERSARY_DAY, SURPRISE_REVEAL_DATE, REUNION_DATE } from "../config";
import { isStandalone } from "../hooks/pwa";

const STORAGE_KEY = "notif-last-shown";

function todayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function showLocalNotification(title, body) {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.ready.then((reg) => {
    reg.showNotification(title, {
      body,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
    });
  });
}

// Al abrir la app (una vez por día) revisa si hoy corresponde algún aviso
// especial y, si hay permiso concedido, dispara una notificación local.
function checkTodayReminders() {
  const key = todayKey();
  if (localStorage.getItem(STORAGE_KEY) === key) return;

  const now = new Date();
  const reveal = new Date(SURPRISE_REVEAL_DATE);
  const reunion = new Date(REUNION_DATE);

  if (now.toDateString() === reunion.toDateString()) {
    showLocalNotification("¡Hoy es el día! 🎉", "Por fin se reencuentran.");
  } else if (now.toDateString() === reveal.toDateString()) {
    showLocalNotification("✈️ Pronto nos veremos, amor", "Ya empezó la recta final.");
  } else if (now.getDate() === ANNIVERSARY_DAY) {
    showLocalNotification("Gracias por un mes más a tu lado 💛", "Feliz aniversario mensual.");
  }

  localStorage.setItem(STORAGE_KEY, key);
}

// Botón flotante para activar notificaciones. Desaparece en cuanto el
// permiso queda concedido. Además, si la app ya está instalada (abierta
// como PWA) y todavía no se activaron los recordatorios, se le pregunta
// directamente con un modal cada vez que la abre.
export default function NotificationButton() {
  const [permission, setPermission] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "unsupported"
  );
  const [showAsk, setShowAsk] = useState(false);

  useEffect(() => {
    if (permission === "granted") {
      checkTodayReminders();
      return;
    }
    if (isStandalone() && permission === "default") {
      const timer = setTimeout(() => setShowAsk(true), 700);
      return () => clearTimeout(timer);
    }
  }, [permission]);

  if (permission === "unsupported" || permission === "granted" || permission === "denied") {
    return null;
  }

  const requestPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
    } catch {
      setPermission("denied");
    }
    setShowAsk(false);
  };

  return (
    <>
      <button
        onClick={requestPermission}
        className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-5 z-40 flex items-center gap-2 rounded-full bg-ink-900 px-5 py-3 font-body text-sm font-medium text-paper-100 shadow-glow ring-1 ring-paper-100/15 transition hover:bg-ink-800"
      >
        🔔 Recordatorios
      </button>

      {showAsk && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink-950/60 px-5 pb-28 backdrop-blur-sm sm:items-center sm:pb-5"
          onClick={() => setShowAsk(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-paper-100/10 bg-ink-900 px-5 py-5 text-center shadow-glow"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-body text-sm text-paper-100/90">
              Activa las notificaciones porfi.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowAsk(false)}
                className="flex-1 rounded-full border border-paper-100/15 py-2.5 font-body text-sm text-paper-300 transition hover:bg-ink-800"
              >
                Ahora no
              </button>
              <button
                onClick={requestPermission}
                className="flex-1 rounded-full bg-rose-500 py-2.5 font-body text-sm font-medium text-ink-950 transition hover:bg-rose-400"
              >
                Sí, activar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
