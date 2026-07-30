// Service Worker: soporte offline básico + recordatorios (locales y push).
//
// Hay dos mecanismos de notificación:
// 1. Locales (ver NotificationButton.jsx): se disparan cuando se abre la
//    app, para avisos puntuales (aniversario, día del reencuentro, etc).
// 2. Push real (api/send-daily-push.js + evento "push" acá abajo): llega
//    aunque la app esté cerrada, vía Web Push con VAPID. En iOS solo
//    funciona si la PWA fue agregada a la pantalla de inicio y el sistema
//    es 16.4+.

const CACHE_NAME = "contador-dias-v1";
const APP_SHELL = ["/", "/index.html", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

// Estrategia: network-first para navegación (para no quedarte con una
// versión vieja de la app), cache-first con actualización en segundo plano
// para el resto de assets (JS/CSS/imágenes/fuentes) => funciona offline.
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("/index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

// Push real: llega desde el servidor (api/send-daily-push.js) aunque la app
// esté cerrada. El payload trae { title, body }.
self.addEventListener("push", (event) => {
  let data = { title: "Contador de días", body: "" };
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons/icon-192.png",
      badge: "/icons/badge-96.png",
    })
  );
});

// Al tocar una notificación (local o push), enfoca (o abre) la app.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      if (clients.length > 0) return clients[0].focus();
      return self.clients.openWindow("/");
    })
  );
});
