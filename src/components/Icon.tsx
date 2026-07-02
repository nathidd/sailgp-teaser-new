import type { JSX } from "react";

/**
 * Minimal stroke-based icon set for the deck. Data references an icon by
 * name (e.g. pillar.icon = "globe"); unknown/empty names render nothing.
 */

export type IconName =
  | "globe"
  | "trend"
  | "users"
  | "leaf"
  | "gauge"
  | "sparkle"
  | "sitemap"
  | "compass"
  | "arrow"
  | "check"
  | "plus";

const PATHS: Record<IconName, JSX.Element> = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M21 7v5h-5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 5.6" />
      <path d="M20.5 19a5 5 0 0 0-3.6-4.8" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 6-13 14-14 1 8-4 15-14 14z" />
      <path d="M5 19c3-4 6-6 9-7" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 15a8 8 0 0 1 16 0" />
      <path d="M12 15l4-4" />
      <circle cx="12" cy="15" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />,
  sitemap: (
    <>
      <rect x="9" y="3" width="6" height="5" rx="1" />
      <rect x="3" y="16" width="6" height="5" rx="1" />
      <rect x="15" y="16" width="6" height="5" rx="1" />
      <path d="M12 8v4M6 16v-2h12v2" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  check: <path d="M20 6L9 17l-5-5" />,
  plus: <path d="M12 5v14M5 12h14" />,
};

export function Icon({
  name,
  className,
  size = 22,
}: {
  name?: string;
  className?: string;
  size?: number;
}) {
  if (!name || !(name in PATHS)) return null;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name as IconName]}
    </svg>
  );
}
