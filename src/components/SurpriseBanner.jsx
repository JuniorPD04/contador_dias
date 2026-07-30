import { useMemo } from "react";
import { SURPRISE_REVEAL_DATE, REUNION_DATE } from "../config";
import { SURPRISE_PHRASES, pickDeterministic } from "../data/messages";
import { dayOfYear } from "../hooks/dateUtils";

// Antes de SURPRISE_REVEAL_DATE este componente no renderiza absolutamente
// nada — ninguna pista visible. A partir de esa fecha (y hasta el
// reencuentro) aparece el mensaje sorpresa.
export default function SurpriseBanner() {
  const nowDate = new Date();
  const now = nowDate.getTime();
  const revealDate = new Date(SURPRISE_REVEAL_DATE);
  const reveal = revealDate.getTime();
  const reunion = new Date(REUNION_DATE).getTime();

  if (now < reveal || now >= reunion) return null;

  // El día exacto de SURPRISE_REVEAL_DATE es el día del vuelo: mensaje fijo,
  // no rotativo, para que siempre diga esto sin importar cómo cambie
  // SURPRISE_PHRASES.
  const isFlightDay = nowDate.toDateString() === revealDate.toDateString();
  const phrase = isFlightDay
    ? "Hoy abordo el avión y por fin regreso. Espero poder vernos pronto, mi amor."
    : pickDeterministic(SURPRISE_PHRASES, dayOfYear(nowDate));

  return (
    <div className="mx-auto w-full max-w-sm animate-fade-up rounded-2xl border border-rose-400/30 bg-gradient-to-r from-rose-500/15 to-gold-400/10 px-5 py-4 text-center shadow-glow">
      <p className="font-display text-lg font-medium text-paper-100">✈️ Pronto nos veremos, amor</p>
      <p className="mt-1 font-body text-sm text-paper-300">{phrase}</p>
    </div>
  );
}
