import { redis } from "./_redis.js";

const KEY = "push-subscription:danna";

// Guarda (o reemplaza) la suscripción push del único destinatario de esta
// app. Se llama desde el navegador justo después de que acepta las
// notificaciones. No hace falta más de una fila: es un solo celular.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const subscription = req.body;
  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ error: "Invalid subscription" });
  }

  await redis.set(KEY, subscription);
  return res.status(200).json({ ok: true });
}
