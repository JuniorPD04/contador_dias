import { useMemo } from "react";

// Cielo ambiental: unas pocas estrellas titilando muy lento + un halo de
// "luna" en degradado. Todo CSS, nada de canvas, para que sea liviano.
// Respeta prefers-reduced-motion (ver .animate-twinkle en index.css).
export default function Starfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        top: Math.random() * 78,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 2 + 2.5,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-32 right-[-10%] h-72 w-72 rounded-full bg-violet-500/25 blur-[90px]" />
      <div className="absolute top-1/3 -left-24 h-64 w-64 rounded-full bg-rose-500/10 blur-[100px]" />
      <div className="absolute top-10 right-10 h-24 w-24 rounded-full bg-gold-400/20 blur-2xl animate-float" />
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-paper-100 animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
