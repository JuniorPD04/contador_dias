// Service Worker: soporte offline básico + recordatorios locales.
//
// Nota honesta sobre notificaciones en iOS:
// Safari en iOS solo permite Web Push real (con el usuario sin tener la app
// abierta) si la PWA fue agregada a la pantalla de inicio y el sistema es
// iOS 16.4+, y ESO requiere un servidor propio enviando pushes firmados
// (VAPID/APNs). Aquí NO hay servidor, así que lo que implementamos son
// notificaciones LOCALES: se disparan cuando ella/tú abren la app y el
// service worker ya está activo. Es justo lo que pide el requisito 5
// ("mostrar un aviso cuando abra la app"). Si más adelante quieres push
// real en segundo plano, necesitarás un backend pequeño.

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

// Al tocar una notificación local, enfoca (o abre) la app.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      if (clients.length > 0) return clients[0].focus();
      return self.clients.openWindow("/");
    })
  );
});
