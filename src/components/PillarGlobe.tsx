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

type Mode = "destinations" | "broadcast";
type Globe = ReturnType<typeof createGlobe>;

const THETA = 0.3;
const SPEED = 0.004;
const BROADCAST_SPEED = 0.011; // faster spin while the world lights up
const DEG = Math.PI / 180;
const R_MARKER = 0.85; // cobe ee + default markerElevation

// World population centres — green dots light up here in broadcast mode.
const CITIES: [number, number][] = [
  [51.5, -0.12], [48.85, 2.35], [52.52, 13.4], [40.42, -3.7], [41.9, 12.5],
  [52.37, 4.9], [59.33, 18.06], [55.75, 37.62], [41.0, 28.98], [50.11, 8.68],
  [40.71, -74.0], [34.05, -118.24], [41.88, -87.63], [43.65, -79.38], [19.43, -99.13],
  [25.76, -80.19], [37.77, -122.42], [47.61, -122.33], [45.5, -73.57],
  [-23.55, -46.63], [-34.6, -58.38], [-22.9, -43.2], [-12.05, -77.04], [4.71, -74.07],
  [6.52, 3.37], [30.04, 31.24], [-26.2, 28.04], [-1.29, 36.82], [33.57, -7.59],
  [25.2, 55.27], [24.71, 46.68], [32.08, 34.78], [35.69, 51.39],
  [19.08, 72.88], [28.61, 77.21], [12.97, 77.59], [24.86, 67.0], [23.81, 90.41],
  [39.9, 116.4], [31.23, 121.47], [22.32, 114.17], [37.57, 126.98], [35.68, 139.65],
  [1.35, 103.82], [13.76, 100.5], [-6.21, 106.85], [14.6, 120.98], [21.03, 105.85],
  [-33.87, 151.21], [-37.81, 144.96], [-36.85, 174.76], [-31.95, 115.86], [-27.47, 153.03],
];

/** A shuffled index order so cities light up scattered (not sequential). */
function makeOrder() {
  const o = CITIES.map((_, i) => i);
  for (let i = o.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [o[i], o[j]] = [o[j], o[i]];
  }
  return o;
}

/** Set the globe's markers for a mode. Manages the broadcast twinkle timer. */
function applyMarkers(
  globeRef: { current: Globe | null },
  mode: Mode,
  order: number[],
  timerRef: { current: ReturnType<typeof setInterval> | null }
) {
  if (timerRef.current) {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }
  const globe = globeRef.current;
  if (!globe) return;

  if (mode === "broadcast") {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let count = reduce ? CITIES.length : 8;
    const markersFor = (c: number, off: Set<number>) =>
      order
        .slice(0, c)
        .filter((i) => !off.has(i))
        .map((i) => ({ location: CITIES[i], size: 0.02 }));
    globe.update({ markers: markersFor(count, new Set()) });
    if (!reduce) {
      timerRef.current = setInterval(() => {
        if (count < CITIES.length) count = Math.min(CITIES.length, count + 3);
        const off = new Set<number>();
        off.add(order[Math.floor(Math.random() * count)]);
        off.add(order[Math.floor(Math.random() * count)]);
        globeRef.current?.update({ markers: markersFor(count, off) });
      }, 160);
    }
  } else {
    // destinations: dots are the HTML overlay, so no cobe markers.
    globe.update({ markers: [] });
  }
}

/**
 * One persistent globe for the pillars. It never remounts between the Global
 * Scale and Momentum tabs — only its `mode` changes:
 *   destinations — race markers as pulsing HTML dots + labels.
 *   broadcast    — green cobe markers light up across the world (viewers
 *                  joining the broadcast), sized to blend with the map dots.
 */
export function PillarGlobe({
  mode,
  destinations,
}: {
  mode: Mode;
  destinations: GlobeDestination[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const labelRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const pointerX = useRef<number | null>(null);
  const phi = useRef(0);
  const width = useRef(0);
  const globeRef = useRef<Globe | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const modeRef = useRef(mode);
  const destRef = useRef(destinations);
  const orderRef = useRef<number[] | null>(null);

  // Keep the animation loop reading the latest mode/destinations.
  useEffect(() => {
    modeRef.current = mode;
    destRef.current = destinations;
  }, [mode, destinations]);

  // Create the globe once; it persists across mode changes.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const measure = () => (width.current = canvas.offsetWidth);
    measure();

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
      phi.current += (e.clientX - pointerX.current) * 0.008;
      pointerX.current = e.clientX;
    };
    const onUp = () => {
      pointerX.current = null;
      if (canvas) canvas.style.cursor = "grab";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("resize", measure);

    let raf = 0;
    let ro: ResizeObserver | undefined;

    const start = () => {
      if (globeRef.current || width.current === 0) return;
      globeRef.current = createGlobe(canvas, {
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
        markerColor: [0.906, 1, 0],
        glowColor: [0.06, 0.08, 0.13],
        opacity: 0.92,
        markers: [],
      });
      applyMarkers(globeRef, modeRef.current, (orderRef.current ??= makeOrder()), timerRef);

      const tick = () => {
        if (pointerX.current === null && !reduce)
          phi.current += modeRef.current === "broadcast" ? BROADCAST_SPEED : SPEED;
        globeRef.current!.update({
          phi: phi.current,
          theta: THETA,
          width: width.current * 2,
          height: width.current * 2,
        });
        const size = width.current;
        if (modeRef.current === "destinations") {
          const computed = destRef.current.map((d) => {
            const { sx, sy, depth } = project(d.lat, d.lng, phi.current, size);
            return { d, sx, sy, depth, vis: Math.max(0, Math.min(1, (depth - 0.05) / 0.3)) };
          });
          for (const c of computed) {
            const el = overlayRefs.current[c.d.id];
            if (!el) continue;
            el.style.transform = `translate(${c.sx}px, ${c.sy}px)`;
            el.style.opacity = String(c.vis);
            el.style.zIndex = String(Math.round((c.depth + 1) * 100));
          }
          const placed: { x: number; y: number; w: number; h: number }[] = [];
          const shown = new Set<string>();
          for (const c of computed.filter((c) => c.vis > 0.12).sort((a, b) => b.depth - a.depth)) {
            const w = Math.max(c.d.city.length, c.d.date.length) * 7.2 + 12;
            const box = { x: c.sx - w / 2, y: c.sy - 52, w, h: 34 };
            const overlaps = placed.some(
              (p) =>
                !(box.x + box.w < p.x || box.x > p.x + p.w || box.y + box.h < p.y || box.y > p.y + p.h)
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
        } else {
          for (const d of destRef.current) {
            const el = overlayRefs.current[d.id];
            if (el) el.style.opacity = "0";
          }
        }
        raf = requestAnimationFrame(tick);
      };
      tick();
      requestAnimationFrame(() => {
        if (canvas) canvas.style.opacity = "1";
      });
    };

    if (width.current > 0) start();
    else {
      ro = new ResizeObserver((entries) => {
        if ((entries[0]?.contentRect.width ?? 0) > 0) {
          measure();
          start();
        }
      });
      ro.observe(canvas);
    }

    const timer = timerRef;
    const globe = globeRef;
    return () => {
      cancelAnimationFrame(raf);
      if (timer.current) clearInterval(timer.current);
      ro?.disconnect();
      globe.current?.destroy();
      globe.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Re-apply markers whenever the mode flips.
  useEffect(() => {
    applyMarkers(globeRef, mode, (orderRef.current ??= makeOrder()), timerRef);
    const timer = timerRef;
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [mode]);

  return (
    <div className="tp-globe">
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
          </div>
        ))}
      </div>
    </div>
  );
}
