"use client";

import { useEffect, useRef, useState } from "react";

type RevealOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
};

const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const {
    threshold = 0.18,
    rootMargin = "0px 0px -80px 0px",
    once = true,
  } = options;
  const ref = useRef<T>(null);
  // Start visible when the user prefers reduced motion or IntersectionObserver
  // is unavailable — avoids a setState-in-effect cascade.
  const [visible, setVisible] = useState<boolean>(
    () =>
      typeof window === "undefined"
        ? false
        : typeof IntersectionObserver === "undefined" || prefersReducedMotion()
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || prefersReducedMotion()) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, visible };
}

/**
 * Fraction of the page scrolled, 0 at the top and 1 at the very bottom.
 * Drives the top-banner progress line.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const onScroll = () => {
      if (rafRef.current !== null) return;
      
      rafRef.current = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0);
        rafRef.current = null;
      });
    };

    const onResize = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0);
        rafRef.current = null;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return progress;
}

export function useScrolledPast(thresholdPx: number) {
  const [past, setPast] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        setPast(window.scrollY > thresholdPx);
        rafRef.current = null;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [thresholdPx]);

  return past;
}
