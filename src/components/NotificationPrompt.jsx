import { useEffect, useState } from "react";
import { ANNIVERSARY_DAY, SURPRISE_REVEAL_DATE, REUNION_DATE } from "../config";

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
// Esto es lo que cubre el requisito de "mostrar un aviso cuando abra la app".
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

export default function NotificationPrompt() {
  const [permission, setPermission] = useState(
    typeof Notification !== "undefined" ? Notification.permission : "unsupported"
  );

  useEffect(() => {
    if (permission === "granted") checkTodayReminders();
  }, [permission]);

  if (permission === "unsupported" || permission === "granted") return null;

  const requestPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
    } catch {
      setPermission("denied");
    }
  };

  return (
    <div className="mx-auto w-full max-w-sm animate-fade-up rounded-2xl border border-paper-100/10 bg-ink-900/60 px-5 py-4" style={{ animationDelay: "280ms" }}>
      <p className="font-body text-sm text-paper-100/90">
        Activa los recordatorios porfi, así te aviso del aniversario mensual y
        del día del reencuentro.
      </p>
      <button
        onClick={requestPermission}
        className="mt-3 w-full rounded-full bg-rose-500 py-2.5 font-body text-sm font-medium text-ink-950 transition hover:bg-rose-400"
      >
        🔔 Activar recordatorios
      </button>
      {permission === "denied" && (
        <p className="mt-2 font-mono text-[10px] text-paper-400/70">
          Los bloqueaste antes. En iPhone: Ajustes → Notificaciones → busca
          esta app (debe estar agregada a Inicio) para reactivarlos.
        </p>
      )}
    </div>
  );
}
