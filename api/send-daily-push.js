import webpush from "web-push";
import { redis } from "./_redis.js";

const KEY = "push-subscription:danna";

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Disparado por el Cron Job de Vercel (ver vercel.json) todos los días a
// mediodía. Vercel firma la llamada con "Authorization: Bearer $CRON_SECRET"
// cuando esa variable de entorno existe — la verificamos para que nadie más
// pueda llamar a este endpoint y spamear la notificación.
export default async function handler(req, res) {
  const auth = req.headers.authorization;
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const subscription = await redis.get(KEY);
  if (!subscription) {
    return res.status(200).json({ skipped: true, reason: "no subscription saved yet" });
  }

  const payload = JSON.stringify({
    title: "Revisa la app, mi amor",
    body: "Te envío esta notificación por si no has revisado la app amor, muak ❤️🦦",
  });

  try {
    await webpush.sendNotification(subscription, payload);
    return res.status(200).json({ ok: true });
  } catch (err) {
    if (err.statusCode === 404 || err.statusCode === 410) {
      // La suscripción ya no es válida (desinstaló la app, etc.) — se borra
      // para no seguir intentando en vano.
      await redis.del(KEY);
    }
    return res.status(500).json({ error: err.message });
  }
}
