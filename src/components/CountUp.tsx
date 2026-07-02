"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReveal } from "@/lib/animations";

/**
 * Animated count-up for a formatted stat string. Parses an optional
 * prefix + number + optional suffix ("$125K", "+18%", "2.1×", "240M",
 * "1st") and animates the number from 0 when scrolled into view. Values
 * with a letter prefix ("F50") or no number ("xx%") render static. SSR
 * renders the 0 state so hydration matches; reduced-motion jumps to final.
 */

const NUM_RE = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(\D*)$/;

type Parsed = {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  useGrouping: boolean;
};

function parse(value: string): Parsed | null {
  const m = value.match(NUM_RE);
  if (!m) return null;
  const [, prefix, numStr, suffix] = m;
  // Letter prefixes ("F50") aren't quantities — leave them static.
  if (/[A-Za-z]/.test(prefix)) return null;
  const useGrouping = numStr.includes(",");
  const clean = numStr.replace(/,/g, "");
  const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;
  const target = parseFloat(clean);
  if (!Number.isFinite(target)) return null;
  return { prefix, suffix, target, decimals, useGrouping };
}

function format(n: number, decimals: number, useGrouping: boolean): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping,
  });
}

export function CountUp({
  value,
  className,
  durationMs = 1400,
}: {
  value: string;
  className?: string;
  durationMs?: number;
}) {
  // Memoized so its identity is stable across the re-renders the
  // animation loop itself triggers — otherwise the effect below sees a
  // "new" dependency on every tick, cancels its own rAF, and the
  // `started` guard then blocks it from ever restarting.
  const parsed = useMemo(() => parse(value), [value]);
  const { ref, visible } = useReveal<HTMLSpanElement>({ threshold: 0.4 });
  const [display, setDisplay] = useState<string>(() =>
    parsed ? format(0, parsed.decimals, parsed.useGrouping) : value
  );
  const started = useRef(false);

  useEffect(() => {
    if (!parsed || !visible || started.current) return;
    started.current = true;

    const finalStr = format(parsed.target, parsed.decimals, parsed.useGrouping);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    // Jump straight to the final value under reduced motion (still async,
    // via rAF, so no synchronous setState in the effect body).
    if (reduced) {
      raf = requestAnimationFrame(() => setDisplay(finalStr));
      return () => cancelAnimationFrame(raf);
    }

    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setDisplay(format(parsed.target * eased, parsed.decimals, parsed.useGrouping));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [parsed, visible, durationMs]);

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {display}
      {parsed.suffix}
    </span>
  );
}
