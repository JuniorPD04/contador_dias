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

console.log("\nÍconos generados en public/icons/");
