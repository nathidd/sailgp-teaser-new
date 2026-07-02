"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** HLS playlist URL (e.g. https://stream.mux.com/<id>.m3u8) or a regular video src. */
  src: string;
  poster?: string;
  className?: string;
};

/**
 * Looping, muted background video that plays HLS (.m3u8) cross-browser:
 * native Safari, hls.js everywhere else.
 *
 * Two non-obvious behaviours:
 *   - `autoPlay` HTML attribute does not fire reliably when `src` is set
 *     after mount, so we call `video.play()` explicitly once the source
 *     is attached. Failure is swallowed (autoplay-blocking browsers).
 *   - hls.js's adaptive bitrate starts conservatively and tends to stay
 *     at a lower quality during a silent hero loop. We pin to the highest
 *     rendition on MANIFEST_PARSED so the background is always crisp.
 */
export function HeroVideo({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !src) return;

    const tryPlay = () => {
      const result = video.play();
      if (result && typeof result.catch === "function") result.catch(() => {});
    };

    const isHls = /\.m3u8(\?|$)/i.test(src);
    if (!isHls) {
      video.src = src;
      tryPlay();
      return;
    }

    // Native HLS (Safari, iOS).
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      tryPlay();
      return;
    }

    let hls: import("hls.js").default | null = null;
    let cancelled = false;
    (async () => {
      const Hls = (await import("hls.js")).default;
      if (cancelled || !Hls.isSupported()) return;
      hls = new Hls({
        enableWorker: true,
        capLevelToPlayerSize: false,
        startLevel: -1,
      });
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!hls) return;
        // Force the highest rendition — a silent hero loop should always
        // look crisp regardless of ABR's bandwidth estimate.
        hls.currentLevel = hls.levels.length - 1;
        tryPlay();
      });
      hls.loadSource(src);
      hls.attachMedia(video);
    })();

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
