import { YOUR_NAME, PARTNER_NAME, RELATIONSHIP_START } from "../config";

function formatDots(dateStr) {
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}·${mm}·${yyyy}`;
}

export default function Header() {
  return (
    <header className="flex flex-col items-center gap-2 pt-[max(1.5rem,env(safe-area-inset-top))] text-center animate-fade-up">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-paper-400">
        {YOUR_NAME} <span className="text-rose-400">✦</span> {PARTNER_NAME}
      </p>
      <p className="font-mono text-[11px] tracking-wider text-paper-400/70">
        juntos desde {formatDots(RELATIONSHIP_START)}
      </p>
    </header>
  );
}
