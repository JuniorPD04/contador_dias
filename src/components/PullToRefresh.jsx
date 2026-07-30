import { useRef, useState } from "react";

const THRESHOLD = 70;
const MAX_PULL = 110;

// Gesto manual de "desliza para recargar". Necesario porque el gesto nativo
// del navegador no es confiable en PWA instalada (no existe en iOS, y en
// Android depende de que overscroll-behavior lo permita). Solo se activa si
// el dedo empieza a deslizar hacia abajo estando ya arriba del todo.
export default function PullToRefresh({ children }) {
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(null);
  const dragging = useRef(false);

  const onTouchStart = (e) => {
    if (refreshing || window.scrollY > 0) return;
    startY.current = e.touches[0].clientY;
    dragging.current = true;
  };

  const onTouchMove = (e) => {
    if (!dragging.current || startY.current === null) return;
    const delta = e.touches[0].clientY - startY.current;
    if (delta <= 0) {
      setPull(0);
      return;
    }
    setPull(Math.min(MAX_PULL, delta * 0.5));
  };

  const onTouchEnd = () => {
    if (!dragging.current) return;
    dragging.current = false;
    startY.current = null;
    setPull((current) => {
      if (current >= THRESHOLD) {
        setRefreshing(true);
        window.location.reload();
        return THRESHOLD;
      }
      return 0;
    });
  };

  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center"
        style={{
          paddingTop: "max(0.75rem, env(safe-area-inset-top))",
          opacity: pull > 4 ? Math.min(1, pull / THRESHOLD) : 0,
          transition: dragging.current ? "none" : "opacity 0.2s ease",
        }}
      >
        <div className="flex items-center gap-2 rounded-full bg-ink-900/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-paper-300 ring-1 ring-paper-100/10">
          {refreshing
            ? "actualizando…"
            : pull >= THRESHOLD
              ? "suelta para recargar"
              : "desliza para recargar"}
        </div>
      </div>

      <div
        style={{
          transform: `translateY(${pull}px)`,
          transition: dragging.current ? "none" : "transform 0.25s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}
