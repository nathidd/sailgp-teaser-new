"use client";

import { useEffect, useRef, useState } from "react";
import VimeoPlayer from "@vimeo/player";

type Props = {
  /** Full Vimeo player embed URL — must NOT use `background=1` (no audio). */
  src: string;
  title?: string;
};

/**
 * Vimeo background-style video with a custom control bar:
 *   • Play/Pause   • Tap for Sound (mute toggle)   • Fullscreen
 *
 * Uses the Vimeo Player JS SDK for play/pause/mute, but fullscreens the
 * WRAPPER element (native Element.requestFullscreen) instead of the iframe
 * so our overlay controls go fullscreen alongside the video. If we called
 * `player.requestFullscreen()` instead, the iframe alone would expand and
 * our exit button would be hidden behind it.
 *
 * The iframe URL must omit the `background=1` param — that flag strips
 * audio entirely; we pass `controls=0&autoplay=1&muted=1&loop=1&playsinline=1`
 * for the same visual behaviour but with audio available on demand.
 */
export function AboutVideo({ src, title }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<VimeoPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!iframeRef.current) return;
    const player = new VimeoPlayer(iframeRef.current);
    playerRef.current = player;

    player.on("play", () => setIsPlaying(true));
    player.on("pause", () => setIsPlaying(false));
    player.on("volumechange", () => {
      player.getMuted().then(setIsMuted).catch(() => {});
    });

    return () => {
      player.destroy().catch(() => {});
      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onFsChange = () =>
      setIsFullscreen(document.fullscreenElement === wrapperRef.current);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  function togglePlay() {
    const p = playerRef.current;
    if (!p) return;
    (isPlaying ? p.pause() : p.play()).catch(() => {});
  }

  function toggleMute() {
    const p = playerRef.current;
    if (!p) return;
    p.setMuted(!isMuted).catch(() => {});
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      wrapperRef.current?.requestFullscreen().catch(() => {});
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={`tp-about__video${isFullscreen ? " is-fullscreen" : ""}`}
    >
      <iframe
        ref={iframeRef}
        src={src}
        title={title ?? "About"}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />

      <div className="tp-about__controls">
        <button
          type="button"
          className="tp-about__ctrl tp-about__ctrl--round"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 5l12 7-12 7V5z" />
            </svg>
          )}
        </button>

        <button
          type="button"
          className={`tp-about__ctrl tp-about__ctrl--sound${isMuted ? " is-muted" : ""}`}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
              <line x1="22" y1="9" x2="16" y2="15" />
              <line x1="16" y1="9" x2="22" y2="15" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
          {isMuted && <span>Tap for Sound</span>}
        </button>

        <button
          type="button"
          className="tp-about__ctrl tp-about__ctrl--round"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 3v6H3" />
              <path d="M15 3v6h6" />
              <path d="M9 21v-6H3" />
              <path d="M15 21v-6h6" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 9V3h6" />
              <path d="M21 9V3h-6" />
              <path d="M3 15v6h6" />
              <path d="M21 15v6h-6" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
