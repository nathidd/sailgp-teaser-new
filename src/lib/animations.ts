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

export function useScrolledPast(thresholdPx: number) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setPast(window.scrollY > thresholdPx);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [thresholdPx]);
  return past;
}
