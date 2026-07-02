"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { NextStepsSection, PricingPackage } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { isMeaningful, filterMeaningful } from "@/lib/render-utils";

export function PitchNextSteps({ data }: { data: NextStepsSection }) {
  const packages = filterMeaningful(data.prospect.packages).filter(
    (p) => isMeaningful(p.name) && isMeaningful(p.packageValue)
  );
  if (packages.length === 0) return null;

  return (
    <section
      id={SectionId.nextSteps}
      className="tp-section tp-section--surface tp-pricing"
      aria-label="Pricing packages"
    >
      <div className="tp-container">
        {(isMeaningful(data.editable?.label) ||
          isMeaningful(data.editable?.headline)) && (
          <Reveal>
            <header className="tp-section-head tp-pricing__head">
              {isMeaningful(data.editable?.label) && (
                <p className="tp-eyebrow">{data.editable!.label}</p>
              )}
              {isMeaningful(data.editable?.headline) && (
                <h2 className="tp-display tp-display--lg">
                  {data.editable!.headline}
                </h2>
              )}
            </header>
          </Reveal>
        )}

        <div
          className="tp-pricing__grid"
          style={{ "--pkg-count": packages.length } as React.CSSProperties}
        >
          {packages.map((pkg, i) => (
            <Reveal key={pkg._key ?? pkg.name} delay={(i + 1) as 1 | 2 | 3}>
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PackageCard({ pkg }: { pkg: PricingPackage }) {
  const [view, setView] = useState<"rights" | "breakdown">("rights");
  const rights = filterMeaningful(pkg.keyRights);
  const breakdown = filterMeaningful(pkg.breakdown).filter(
    (row) => isMeaningful(row.label) && isMeaningful(row.value)
  );
  const hasBreakdown = breakdown.length > 0;

  return (
    <article
      className={`tp-pricing__card${
        pkg.isRecommended ? " tp-pricing__card--recommended" : ""
      }`}
    >
      {pkg.isRecommended && (
        <span className="tp-pricing__badge">Recommended</span>
      )}

      {(isMeaningful(pkg.contractTerm) || isMeaningful(pkg.annualScaling)) && (
        <ul className="tp-pricing__pills">
          {isMeaningful(pkg.contractTerm) && (
            <li className="tp-pricing__pill" title={`Contract term: ${pkg.contractTerm}`}>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span className="tp-pricing__pill-value">{pkg.contractTerm}</span>
            </li>
          )}
          {isMeaningful(pkg.annualScaling) && (
            <li className="tp-pricing__pill" title={`Annual scaling: ${pkg.annualScaling}`}>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
              <span className="tp-pricing__pill-value">{pkg.annualScaling}</span>
            </li>
          )}
        </ul>
      )}

      <header className="tp-pricing__card-head">
        <h3 className="tp-pricing__name">{pkg.name}</h3>
        {isMeaningful(pkg.tagline) && (
          <p className="tp-pricing__tagline">{pkg.tagline}</p>
        )}
      </header>

      <p className="tp-pricing__value">
        <span className="tp-pricing__value-amount">{pkg.packageValue}</span>
        {isMeaningful(pkg.packageValueSuffix) && (
          <span className="tp-pricing__value-suffix">
            {pkg.packageValueSuffix}
          </span>
        )}
      </p>

      {hasBreakdown && rights.length > 0 && (
        <div className="tp-pricing__tabs" role="tablist" aria-label="Package detail view">
          <button
            type="button"
            role="tab"
            aria-selected={view === "rights"}
            className={`tp-pricing__tab${view === "rights" ? " is-active" : ""}`}
            onClick={() => setView("rights")}
          >
            Included Rights
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "breakdown"}
            className={`tp-pricing__tab${view === "breakdown" ? " is-active" : ""}`}
            onClick={() => setView("breakdown")}
          >
            Price Breakdown
          </button>
        </div>
      )}

      <div className="tp-pricing__swap">
        <AnimatePresence mode="wait">
          {view === "rights" ? (
            <motion.div
              key="rights"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="tp-pricing__block"
            >
              {rights.length > 0 ? (
                <ul className="tp-pricing__rights">
                  {rights.map((right, i) => (
                    <li key={i}>
                      <span className="tp-pricing__rights-bullet" aria-hidden>
                        •
                      </span>
                      <span>{right}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.div>
          ) : (
            <motion.div
              key="breakdown"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="tp-pricing__block"
            >
              <dl className="tp-pricing__breakdown">
                {breakdown.map((row, i) => {
                  const isTotal =
                    i === breakdown.length - 1 && /total/i.test(row.label);
                  return (
                    <div
                      key={row._key ?? i}
                      className={`tp-pricing__breakdown-row${
                        isTotal ? " tp-pricing__breakdown-row--total" : ""
                      }`}
                    >
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  );
                })}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}
