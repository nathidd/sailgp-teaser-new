"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export type GlobeDestination = {
  id: string;
  city: string;
  date: string;
  lat: number;
  lng: number;
};

const THETA = 0.3; // vertical tilt, matches the globe's theta
const SPEED = 0.004;
const DEG = Math.PI / 180;
const R_MARKER = 0.85; // cobe's ee (0.8) + default markerElevation (0.05)

/**
 * Interactive globe of the SailGP race destinations. cobe renders the earth
 * and the acid-green marker dots; an HTML overlay adds the pulsing rings and
 * a city + date label that fades in as each destination rotates to the front.
 */
export function RaceGlobe({
  destinations,
  className = "",
}: {
  destinations: GlobeDestination[];
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const labelRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const pointerX = useRef<number | null>(null);
  const phi = useRef(0);
  const width = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const measure = () => (width.current = canvas.offsetWidth);
    measure();

    // Exact replica of cobe's marker projection (its U() location vector +
    // O() screen transform), so overlay dots land where cobe draws markers.
    const project = (lat: number, lng: number, gphi: number, size: number) => {
      const latR = lat * DEG;
      const lonR = lng * DEG - Math.PI;
      const cl = Math.cos(latR);
      const x = -cl * Math.cos(lonR) * R_MARKER;
      const y = Math.sin(latR) * R_MARKER;
      const z = cl * Math.sin(lonR) * R_MARKER;
      const cp = Math.cos(gphi);
      const sp = Math.sin(gphi);
      const ct = Math.cos(THETA);
      const st = Math.sin(THETA);
      const c = cp * x + sp * z;
      const s = sp * st * x + ct * y - cp * st * z;
      const depth = -sp * ct * x + st * y + cp * ct * z;
      return { sx: ((c + 1) / 2) * size, sy: ((-s + 1) / 2) * size, depth };
    };

    const onMove = (e: PointerEvent) => {
      if (pointerX.current === null) return;
      const dx = e.clientX - pointerX.current;
      pointerX.current = e.clientX;
      phi.current += dx * 0.008;
    };
    const onUp = () => {
      pointerX.current = null;
      if (canvas) canvas.style.cursor = "grab";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("resize", measure);

    let globe: ReturnType<typeof createGlobe> | null = null;
    let raf = 0;
    let ro: ResizeObserver | undefined;

    const start = () => {
      if (globe || width.current === 0) return;
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: width.current * 2,
        height: width.current * 2,
        phi: 0,
        theta: THETA,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [0.28, 0.3, 0.36],
        markerColor: [0.906, 1, 0], // #E7FF00
        glowColor: [0.06, 0.08, 0.13],
        opacity: 0.92,
        // Dots + labels are the HTML overlay (below) so they stay aligned.
        markers: [],
      });

      const tick = () => {
        if (pointerX.current === null && !reduce) phi.current += SPEED;
        globe!.update({
          phi: phi.current,
          theta: THETA,
          width: width.current * 2,
          height: width.current * 2,
        });
        const size = width.current;
        const computed = destinations.map((d) => {
          const { sx, sy, depth } = project(d.lat, d.lng, phi.current, size);
          const vis = Math.max(0, Math.min(1, (depth - 0.05) / 0.3));
          return { d, sx, sy, depth, vis };
        });

        // Position every dot + pulse (fade by how front-facing it is).
        for (const c of computed) {
          const el = overlayRefs.current[c.d.id];
          if (!el) continue;
          el.style.transform = `translate(${c.sx}px, ${c.sy}px)`;
          el.style.opacity = String(c.vis);
          el.style.zIndex = String(Math.round((c.depth + 1) * 100));
        }

        // De-clutter labels: front-most first, hide any whose box overlaps
        // an already-shown label. The dot keeps pulsing; only the text hides.
        const placed: { x: number; y: number; w: number; h: number }[] = [];
        const shown = new Set<string>();
        const front = computed
          .filter((c) => c.vis > 0.12)
          .sort((a, b) => b.depth - a.depth);
        for (const c of front) {
          const w = Math.max(c.d.city.length, c.d.date.length) * 7.2 + 12;
          const h = 34;
          const box = { x: c.sx - w / 2, y: c.sy - 18 - h, w, h };
          const overlaps = placed.some(
            (p) =>
              !(
                box.x + box.w < p.x ||
                box.x > p.x + p.w ||
                box.y + box.h < p.y ||
                box.y > p.y + p.h
              )
          );
          if (!overlaps) {
            placed.push(box);
            shown.add(c.d.id);
          }
        }
        for (const c of computed) {
          const lab = labelRefs.current[c.d.id];
          if (lab) lab.style.opacity = shown.has(c.d.id) ? "1" : "0";
        }

        raf = requestAnimationFrame(tick);
      };
      tick();
      requestAnimationFrame(() => {
        if (canvas) canvas.style.opacity = "1";
      });
    };

    if (width.current > 0) {
      start();
    } else {
      ro = new ResizeObserver((entries) => {
        if ((entries[0]?.contentRect.width ?? 0) > 0) {
          measure();
          start();
        }
      });
      ro.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro?.disconnect();
      globe?.destroy();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", measure);
    };
  }, [destinations]);

  return (
    <div className={`tp-globe ${className}`.trim()}>
      <canvas
        ref={canvasRef}
        className="tp-globe__canvas"
        onPointerDown={(e) => {
          pointerX.current = e.clientX;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
      />
      <div className="tp-globe__overlay" aria-hidden="true">
        {destinations.map((d) => (
          <div
            key={d.id}
            ref={(el) => {
              overlayRefs.current[d.id] = el;
            }}
            className="tp-globe__pin"
          >
            <span className="tp-globe__pin-inner">
              <span className="tp-globe__pulse" />
              <span className="tp-globe__pulse tp-globe__pulse--2" />
              <span className="tp-globe__dot" />
              <span
                ref={(el) => {
                  labelRefs.current[d.id] = el;
                }}
                className="tp-globe__label"
              >
                {d.city}
                <span className="tp-globe__date">{d.date}</span>
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
