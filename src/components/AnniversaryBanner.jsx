import { useMemo } from "react";
import { RELATIONSHIP_START, ANNIVERSARY_DAY } from "../config";
import { ANNIVERSARY_PHRASES, pickDeterministic } from "../data/messages";
import { monthsBetween } from "../hooks/dateUtils";

// Solo se muestra el día del mes configurado en ANNIVERSARY_DAY (por defecto 7).
export default function AnniversaryBanner() {
  const today = useMemo(() => new Date(), []);
  const isAnniversaryDay = today.getDate() === ANNIVERSARY_DAY;

  const months = useMemo(
    () => monthsBetween(new Date(RELATIONSHIP_START), today),
    [today]
  );

  if (!isAnniversaryDay || months <= 0) return null;

  const phrase = pickDeterministic(ANNIVERSARY_PHRASES, months);

  return (
    <div
      className="mx-auto w-full max-w-sm animate-fade-up rounded-2xl border border-gold-400/30 bg-gradient-to-r from-gold-400/15 to-transparent px-5 py-4 shadow-goldglow"
      style={{ animationDelay: "220ms" }}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-400">
        hoy cumplimos {months} meses 💛
      </p>
      <p className="mt-1 font-body text-[15px] text-paper-100/90">{phrase}</p>
    </div>
  );
}
