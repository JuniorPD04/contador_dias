import { useMemo } from "react";
import { SURPRISE_REVEAL_DATE, REUNION_DATE } from "../config";
import { SURPRISE_PHRASES, pickDeterministic } from "../data/messages";
import { dayOfYear } from "../hooks/dateUtils";

// Antes de SURPRISE_REVEAL_DATE este componente no renderiza absolutamente
// nada — ninguna pista visible. A partir de esa fecha (y hasta el
// reencuentro) aparece el mensaje sorpresa.
export default function SurpriseBanner() {
  const now = Date.now();
  const reveal = new Date(SURPRISE_REVEAL_DATE).getTime();
  const reunion = new Date(REUNION_DATE).getTime();

  if (now < reveal || now >= reunion) return null;

  const phrase = pickDeterministic(SURPRISE_PHRASES, dayOfYear(new Date()));

  return (
    <div className="mx-auto w-full max-w-sm animate-fade-up rounded-2xl border border-rose-400/30 bg-gradient-to-r from-rose-500/15 to-gold-400/10 px-5 py-4 text-center shadow-glow">
      <p className="font-display text-lg font-medium text-paper-100">✈️ Pronto nos veremos, amor</p>
      <p className="mt-1 font-body text-sm text-paper-300">{phrase}</p>
    </div>
  );
}
