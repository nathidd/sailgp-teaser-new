"use client";

import { useScrolledPast, useScrollProgress } from "@/lib/animations";
import type { HeroSection } from "@/lib/data";
import { isMeaningful } from "@/lib/render-utils";

/**
 * Sticky three-column top banner.
 *
 *   row 1:  [SailGP logo]   [Exclusive SailGP Partnership]   [Let's talk →]
 *   row 2:  [Confidential]                                   [Exclusively prepared for HONOR]
 *
 * All copy flows from hero.editable (banner labels, CTA, partner lead-in)
 * and hero.prospect (partnerName). Any field that is empty/blank
 * collapses gracefully — the surrounding row reflows.
 */
export function TopBanner({ data }: { data: HeroSection }) {
  const past = useScrolledPast(40);
  const progress = useScrollProgress();
  const { tenant, prospect, editable } = data;

  const showConfidential = isMeaningful(editable.confidentialLabel);
  const showCenter = isMeaningful(editable.bannerCenterLabel);
  const showCta = editable.cta && isMeaningful(editable.cta.label);
  const showPrepared =
    isMeaningful(editable.partnerLabel) && isMeaningful(prospect.partnerName);
  const showBottomRow = showConfidential || showPrepared;

  // Render the partner logo when it's a real asset path; unresolved
  // {{PLACEHOLDER}} tokens fall back to the partner name text.
  const logoSrc = prospect.partnerLogo?.src;
  const hasPartnerLogo =
    !!logoSrc && (logoSrc.startsWith("/") || logoSrc.startsWith("http"));

  return (
    <header className={`tp-top-banner${past ? " is-scrolled" : ""}`}>
      <span className="tp-top-banner__track" aria-hidden="true">
        <span
          className="tp-top-banner__progress"
          style={{ transform: `scaleX(${progress})` }}
        />
      </span>
      <div className="tp-container tp-top-banner__inner">
        <div className="tp-top-banner__row tp-top-banner__row--top">
          <a
            href="#top"
            className="tp-top-banner__brand"
            aria-label="Back to top"
          >
            {isMeaningful(tenant.logo?.src) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tenant.logo.src}
                alt={tenant.logo.alt ?? ""}
                className="tp-top-banner__logo"
              />
            )}
          </a>
          {showCenter && (
            <p className="tp-top-banner__center">{editable.bannerCenterLabel}</p>
          )}
          {showCta && (
            <a
              href={editable.cta!.href}
              className="tp-top-banner__cta"
            >
              <span>{editable.cta!.label}</span>
              <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
        {showBottomRow && (
          <div className="tp-top-banner__row tp-top-banner__row--bottom">
            {showConfidential ? (
              <span className="tp-top-banner__confidential">
                {editable.confidentialLabel}
              </span>
            ) : (
              <span />
            )}
            {showPrepared && (
              <span className="tp-top-banner__prepared">
                <span className="tp-top-banner__prepared-label">
                  {editable.partnerLabel}
                </span>{" "}
                {hasPartnerLogo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoSrc}
                    alt={prospect.partnerName}
                    className="tp-top-banner__prepared-logo"
                  />
                ) : (
                  <strong className="tp-top-banner__prepared-name">
                    {prospect.partnerName}
                  </strong>
                )}
              </span>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
