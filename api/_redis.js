import { Redis } from "@upstash/redis";

// La integración de Upstash en Vercel se conectó con el prefijo
// "UPSTASH_REDIS", así que las variables reales quedaron como
// UPSTASH_REDIS_KV_REST_API_URL / _TOKEN (no los nombres genéricos que
// Redis.fromEnv() busca por defecto).
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_KV_REST_API_TOKEN,
});
