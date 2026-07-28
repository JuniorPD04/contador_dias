import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { YOUR_NAME, PARTNER_NAME } from "../config";

const PALETTE = ["#E14F8A", "#F2C14E", "#45B7AC", "#F7EFE1"];

export default function CelebrationScreen({ onDismiss }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const burst = (opts) =>
      confetti({ colors: PALETTE, disableForReducedMotion: true, ...opts });

    burst({ particleCount: 120, spread: 90, origin: { y: 0.6 } });

    const interval = setInterval(() => {
      burst({ particleCount: 40, spread: 70, origin: { x: Math.random(), y: 0.3 } });
    }, 900);

    const timeout = setTimeout(() => clearInterval(interval), 4500);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-ink-950/97 px-6 text-center backdrop-blur-sm">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-rose-400">
        {YOUR_NAME} ✦ {PARTNER_NAME}
      </p>
      <h1 className="font-display text-4xl font-semibold text-paper-100 sm:text-5xl">
        Por fin juntos 🎉
      </h1>
      <p className="max-w-xs font-body text-paper-300">
        Se acabó la cuenta regresiva. Todo lo que queda ahora es abrazarte
        sin apuro.
      </p>
      <button
        onClick={() => {
          setVisible(false);
          onDismiss?.();
        }}
        className="mt-4 rounded-full border border-paper-100/20 bg-ink-900 px-6 py-2.5 font-body text-sm text-paper-100 transition hover:border-rose-400/50 hover:bg-ink-800"
      >
        Ver la app
      </button>
    </div>
  );
}
