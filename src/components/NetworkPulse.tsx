"use client";

import { useEffect, useState } from "react";

type Pt = { x: number; y: number };

/**
 * One green light at a time: it starts at a node, travels through the SailGP
 * hub (0-100 space center = 50,50) and continues to another node, then a short
 * pause before the next. Only the active beam is rendered (keyed) so its
 * one-shot CSS travel animation replays each time.
 */
export function NetworkPulse({ points }: { points: Pt[] }) {
  const n = points.length;
  const [active, setActive] = useState(0);

  // Each node beams to a roughly-opposite node, so the sequence criss-crosses
  // the hub and touches every player over one loop.
  const step = Math.max(1, Math.floor(n / 2));
  const count = n;

  useEffect(() => {
    if (n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % count), 2960);
    return () => clearInterval(id);
  }, [n, count]);

  if (n < 2) return null;

  const from = active % n;
  const to = (from + step) % n;
  const a = points[from];
  const b = points[to];
  const d = `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} L 50 50 L ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;

  return (
    <svg
      className="tp-network__beams"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <path key={active} className="tp-network__beam" d={d} />
    </svg>
  );
}
