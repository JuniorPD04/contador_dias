import { useCountdown } from "../hooks/useCountdown";
import { pad2 } from "../hooks/dateUtils";
import { REUNION_DATE, YOUR_NAME, PARTNER_NAME } from "../config";

function Digit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-4xl font-medium tabular-nums text-paper-100 sm:text-5xl">
        {value}
      </span>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-400/70">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTicket() {
  const { days, hours, minutes, seconds } = useCountdown(REUNION_DATE);

  return (
    <div className="ticket relative mx-auto w-full max-w-sm animate-fade-up rounded-[28px] border border-dashed border-paper-100/20 bg-gradient-to-b from-ink-800 to-ink-900 px-6 pb-5 pt-6 shadow-glow">
      <p className="text-center font-mono text-[11px] uppercase tracking-[0.3em] text-rose-400">
        faltan para regresar
      </p>

      <div className="mt-3 flex items-end justify-center gap-1">
        <span className="font-display text-7xl font-semibold tabular-nums text-paper-100 sm:text-8xl">
          {days}
        </span>
        <span className="mb-2 font-mono text-sm uppercase tracking-widest text-paper-400">
          día{days === 1 ? "" : "s"}
        </span>
      </div>

      <div className="ticket-divider my-4" />

      <div className="flex items-center justify-between px-2">
        <Digit value={pad2(hours)} label="hrs" />
        <span className="pb-4 font-display text-xl text-paper-400/50">:</span>
        <Digit value={pad2(minutes)} label="min" />
        <span className="pb-4 font-display text-xl text-paper-400/50">:</span>
        <Digit value={pad2(seconds)} label="seg" />
      </div>

      <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-paper-400/60">
        <span>{YOUR_NAME}</span>
        <span className="text-rose-400">✈</span>
        <span>{PARTNER_NAME}</span>
      </div>
    </div>
  );
}
