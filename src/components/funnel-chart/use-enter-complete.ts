"use client";

import type { MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Returns true once a mount-progress MotionValue reaches 1.
 * Use to swap animated MotionValue-driven props for static values after
 * enter completes — drops per-frame subscriptions during pan/hover.
 */
export function useEnterComplete(mountProgress: MotionValue<number>): boolean {
  const [complete, setComplete] = useState(() => mountProgress.get() >= 1);

  useEffect(() => {
    if (complete) return;
    // Already settled between render and commit — defer to avoid a
    // synchronous setState in the effect body.
    if (mountProgress.get() >= 1) {
      const raf = requestAnimationFrame(() => setComplete(true));
      return () => cancelAnimationFrame(raf);
    }
    return mountProgress.on("change", (value) => {
      if (value >= 1) {
        setComplete(true);
      }
    });
  }, [mountProgress, complete]);

  return complete;
}
