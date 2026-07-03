import type { SeriesPoint } from "@/lib/data";

/*
 * Animated growth curve for the Momentum pillar. The acid-green line + area
 * are drawn left-to-right on mount (a clip-path reveal), the season points
 * are pulsing green dots, and the last step carries a "+NN%" tag. Geometry
 * is computed in a 0–100 space so an HTML overlay (dots/labels) aligns with
 * the stretched SVG (preserveAspectRatio="none").
 */

const PAD_X = 9;
const TOP = 16;
const BOTTOM = 78;

export function MomentumCurve({ series }: { series: SeriesPoint[] }) {
  const pts = (series ?? []).filter((s) => Number.isFinite(s.value));
  if (pts.length < 2) return null;

  const values = pts.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const vMin = min - (max - min) * 0.4;
  const range = max - vMin || 1;

  const coords = pts.map((p, i) => ({
    ...p,
    x: PAD_X + (i / (pts.length - 1)) * (100 - 2 * PAD_X),
    y: TOP + (1 - (p.value - vMin) / range) * (BOTTOM - TOP),
  }));

  const line = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(2)} ${c.y.toFixed(2)}`)
    .join(" ");
  const first = coords[0];
  const last = coords[coords.length - 1];
  const prev = coords[coords.length - 2];
  const area = `${line} L ${last.x.toFixed(2)} ${BOTTOM} L ${first.x.toFixed(2)} ${BOTTOM} Z`;
  const growth = prev.value ? Math.round(((last.value - prev.value) / prev.value) * 100) : 0;

  return (
    <div className="tp-momentum">
      <svg
        className="tp-momentum__svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tp-momentum-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(231, 255, 0, 0.3)" />
            <stop offset="100%" stopColor="rgba(231, 255, 0, 0)" />
          </linearGradient>
          <clipPath id="tp-momentum-reveal" clipPathUnits="userSpaceOnUse">
            <rect className="tp-momentum__reveal" x="0" y="0" width="100" height="100" />
          </clipPath>
        </defs>
        <g clipPath="url(#tp-momentum-reveal)">
          <path d={area} fill="url(#tp-momentum-fill)" />
          <path
            className="tp-momentum__line"
            d={line}
            fill="none"
            stroke="var(--tp-color-accent)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>

      <div className="tp-momentum__overlay">
        {coords.map((c, i) => (
          <span
            key={c.label ?? i}
            className={`tp-momentum__dot${i === coords.length - 1 ? " is-last" : ""}`}
            style={{ left: `${c.x}%`, top: `${c.y}%`, animationDelay: `${0.35 + i * 0.2}s` }}
          >
            <span className="tp-momentum__pulse" />
            <span className="tp-momentum__pulse tp-momentum__pulse--2" />
            <span className="tp-momentum__pip" />
          </span>
        ))}

        {growth > 0 && (
          <span
            className="tp-momentum__growth"
            style={{ left: `${(prev.x + last.x) / 2}%`, top: `${(prev.y + last.y) / 2}%` }}
          >
            +{growth}%
          </span>
        )}

        {coords.map((c, i) => (
          <span
            key={`x-${c.label ?? i}`}
            className="tp-momentum__xlabel"
            style={{ left: `${c.x}%` }}
          >
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}
