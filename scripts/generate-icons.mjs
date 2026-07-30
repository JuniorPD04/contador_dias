// Genera los íconos PWA (varios tamaños) a partir de la imagen fuente.
// Ejecutar con: npm run icons
// Si cambias la foto/ilustración de portada, reemplaza el archivo fuente
// abajo (SOURCE) y vuelve a correr este script.
import sharp from "sharp";
import { mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SOURCE = path.join(ROOT, "imagen_icono_contador.png");
const OUT_DIR = path.join(ROOT, "public", "icons");

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

// Fondo detrás del ícono cuando el sistema recorta a "maskable"
// (mismo tono que el fondo de la app: ink-950)
const BG = "#150F26";

const targets = [
  { name: "icon-192.png", size: 192, padded: false },
  { name: "icon-512.png", size: 512, padded: false },
  { name: "icon-maskable-192.png", size: 192, padded: true },
  { name: "icon-maskable-512.png", size: 512, padded: true },
  { name: "apple-touch-icon.png", size: 180, padded: false },
  { name: "favicon-32.png", size: 32, padded: false },
  { name: "favicon-16.png", size: 16, padded: false },
];

for (const t of targets) {
  const img = sharp(SOURCE).resize(t.size, t.size, { fit: "cover" });

  if (t.padded) {
    // Maskable: deja ~20% de margen de seguridad para que el recorte
    // circular/redondeado de iOS/Android no corte la cara de la pareja.
    const inner = Math.round(t.size * 0.7);
    const padded = await sharp(SOURCE)
      .resize(inner, inner, { fit: "cover" })
      .extend({
        top: Math.round((t.size - inner) / 2),
        bottom: Math.round((t.size - inner) / 2),
        left: Math.round((t.size - inner) / 2),
        right: Math.round((t.size - inner) / 2),
        background: BG,
      })
      .png()
      .toBuffer();
    await sharp(padded).resize(t.size, t.size).toFile(path.join(OUT_DIR, t.name));
  } else {
    await img.png().toFile(path.join(OUT_DIR, t.name));
  }
  console.log("✓", t.name);
}

// Ícono "badge" para notificaciones: Android SIEMPRE lo pinta como silueta
// monocromática (usa solo el canal alfa), así que si le pasamos la foto a
// color termina viéndose como un cuadrado blanco sólido. Por eso va aparte:
// un corazón blanco sobre transparente, nada de foto.
const BADGE_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="-4 -4 32 32">
    <path fill="#ffffff" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
`;
await sharp(Buffer.from(BADGE_SVG)).png().toFile(path.join(OUT_DIR, "badge-96.png"));
console.log("✓ badge-96.png");

console.log("\nÍconos generados en public/icons/");
