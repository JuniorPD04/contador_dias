import { useEffect, useRef, useState } from "react";
import { SEPARATION_START, REUNION_DATE } from "../config";
import { progressPercent } from "../hooks/dateUtils";

const PATH_D = "M 12 58 Q 150 -18 288 58";

export default function FlightProgress() {
  const pathRef = useRef(null);
  const [now, setNow] = useState(() => Date.now());
  const [markerPos, setMarkerPos] = useState({ x: 12, y: 58 });
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (pathRef.current) setPathLength(pathRef.current.getTotalLength());
  }, []);

  const pct = progressPercent(SEPARATION_START, REUNION_DATE, now);

  useEffect(() => {
    if (!pathRef.current || !pathLength) return;
    const point = pathRef.current.getPointAtLength((pct / 100) * pathLength);
    setMarkerPos({ x: point.x, y: point.y });
  }, [pct, pathLength]);

  const dashOffset = pathLength - (pct / 100) * pathLength;

  return (
    <div className="mx-auto w-full max-w-sm animate-fade-up px-2" style={{ animationDelay: "80ms" }}>
      <svg viewBox="0 0 300 70" className="w-full overflow-visible">
        <path d={PATH_D} fill="none" stroke="rgba(247,239,225,0.15)" strokeWidth="2" strokeLinecap="round" />
        <path
          ref={pathRef}
          d={PATH_D}
          fill="none"
          stroke="url(#flightGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.6s ease-out" }}
        />
        <defs>
          <linearGradient id="flightGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E14F8A" />
            <stop offset="100%" stopColor="#F2C14E" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="58" r="3.5" fill="#C9BFD9" />
        <circle cx="288" cy="58" r="3.5" fill="#F2C14E" />
        <text
          x={markerPos.x}
          y={markerPos.y - 10}
          textAnchor="middle"
          fontSize="13"
          style={{ transition: "x 0.6s ease-out, y 0.6s ease-out" }}
        >
          ✈️
        </text>
      </svg>

      <div className="mt-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-paper-400/60">
        <span>lejos</span>
        <span className="font-semibold text-rose-400">{pct.toFixed(1)}% del camino</span>
        <span>juntos</span>
      </div>
    </div>
  );
}
