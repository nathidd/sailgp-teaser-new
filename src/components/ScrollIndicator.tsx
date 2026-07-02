type Props = {
  href: string;
  label: string;
  className?: string;
  ariaLabel?: string;
};

/**
 * Vertical scroll-cue: small label above a thin line with a gold bar that
 * pulses downward. Used at the bottom of the hero and at the bottom of the
 * sticky Experiences gallery. Anchor-based — the browser handles smooth
 * scroll via the href.
 */
export function ScrollIndicator({ href, label, className, ariaLabel }: Props) {
  return (
    <a
      href={href}
      className={`tp-scroll-indicator${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel ?? label}
    >
      <span className="tp-scroll-indicator__label">{label}</span>
      <span className="tp-scroll-indicator__line" aria-hidden="true">
        <span className="tp-scroll-indicator__line-inner" />
      </span>
    </a>
  );
}
