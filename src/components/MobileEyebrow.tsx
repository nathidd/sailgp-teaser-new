/**
 * Small green all-caps section label shown ONLY on mobile, above each section
 * headline — mirrors the labels used in the desktop dot-nav sidebar. Hidden on
 * larger screens via CSS (`.tp-mobile-eyebrow`).
 */
export function MobileEyebrow({ label }: { label: string }) {
  return <span className="tp-mobile-eyebrow">{label}</span>;
}
