"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MotivationLetterSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import {
  isMeaningful,
  filterMeaningful,
  splitParagraphs,
} from "@/lib/render-utils";

export function PitchMotivationLetter({ data }: { data: MotivationLetterSection }) {
  const [open, setOpen] = useState(false);
  const { prospect, tenant } = data;

  const openingParas = splitParagraphs(prospect.opening);
  const values = filterMeaningful(prospect.sharedValues);

  const hasBody =
    isMeaningful(prospect.greeting) ||
    openingParas.length > 0 ||
    values.length > 0 ||
    isMeaningful(prospect.partnershipPitch) ||
    isMeaningful(prospect.closing);
  if (!hasBody) return null;

  function handleOpen() {
    setOpen(true);
  }

  return (
    <section
      id={SectionId.motivationLetter}
      className="tp-section tp-letter"
      aria-label="Personal letter"
    >
      <div className="tp-container tp-letter__inner">
        {isMeaningful(tenant.sectionLabel) && (
          <p className="tp-eyebrow tp-letter__eyebrow">{tenant.sectionLabel}</p>
        )}
        <h2 className="tp-display tp-display--lg tp-letter__heading">A personal note</h2>

        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="trigger"
              className="tp-letter__trigger"
              onClick={handleOpen}
              initial={{ opacity: 0, scale: 0.88, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15, ease: "easeIn" } }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              aria-label="Open personal letter"
            >
              <span className="tp-letter__trigger-ring" />
              <span className="tp-letter__trigger-ring tp-letter__trigger-ring--2" />
              {isMeaningful(tenant.contactPortraitImage) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={tenant.contactPortraitImage}
                  alt={tenant.contactName}
                  className="tp-letter__trigger-avatar"
                />
              )}
              <span className="tp-letter__trigger-badge">1</span>
            </motion.button>
          ) : (
            <motion.div
              key="card"
              className="tp-letter__card"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <button
                className="tp-letter__card-close"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="tp-letter__card-body">
                {isMeaningful(prospect.greeting) && (
                  <p>{prospect.greeting}</p>
                )}

                {openingParas.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}

                {values.length > 0 && (
                  <ul className="tp-letter__values">
                    {values.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                )}

                {isMeaningful(prospect.partnershipPitch) && (
                  <p className="tp-letter__pitch-line">{prospect.partnershipPitch}</p>
                )}

                {isMeaningful(prospect.closing) && (
                  <p>{prospect.closing}</p>
                )}

                {isMeaningful(tenant.signatureImage) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tenant.signatureImage}
                    alt={`${tenant.contactName} signature`}
                    className="tp-letter__signature-img"
                  />
                )}

                <div className="tp-letter__contact">
                  {isMeaningful(tenant.contactPortraitImage) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={tenant.contactPortraitImage}
                      alt={tenant.contactName}
                      className="tp-letter__contact-portrait"
                    />
                  )}
                  <div className="tp-letter__contact-info">
                    {isMeaningful(tenant.contactName) && (
                      <strong>{tenant.contactName}</strong>
                    )}
                    {isMeaningful(tenant.contactRole) && (
                      <span>{tenant.contactRole}</span>
                    )}
                    {isMeaningful(tenant.contactEmail) && (
                      <a href={`mailto:${tenant.contactEmail}`}>{tenant.contactEmail}</a>
                    )}
                    {isMeaningful(tenant.contactPhone) && (
                      <span>{tenant.contactPhone}</span>
                    )}
                  </div>
                </div>

                {isMeaningful(tenant.ctaLabel) && (
                  <a href={tenant.ctaHref} className="tp-letter__cta">
                    {tenant.ctaLabel}
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
