import { useMemo } from "react";
import { DAILY_MESSAGES, pickDeterministic } from "../data/messages";
import { dayOfYear } from "../hooks/dateUtils";

export default function DailyPostcard() {
  const message = useMemo(() => {
    const today = new Date();
    const index = dayOfYear(today) + today.getFullYear();
    return pickDeterministic(DAILY_MESSAGES, index);
  }, []);

  return (
    <div
      className="mx-auto w-full max-w-sm animate-fade-up rounded-2xl border border-paper-100/10 bg-ink-900/70 px-5 py-4 shadow-[0_1px_0_rgba(247,239,225,0.06)_inset] backdrop-blur-sm"
      style={{ animationDelay: "160ms", transform: "rotate(-0.6deg)" }}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal-400">
        mensaje de hoy
      </p>
      <p className="mt-2 font-body text-[15px] leading-relaxed text-paper-100/90">
        {message}
      </p>
    </div>
  );
}
