"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { InvitationSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { MobileEyebrow } from "@/components/MobileEyebrow";
import {
  isMeaningful,
  splitParagraphs,
} from "@/lib/render-utils";

/**
 * Brief Section 8 "Call to Action" — the exclusive invitation. Fixed
 * editorial copy sits up top; the per-prospect personal note (from Denis)
 * is revealed on click via the recycled letter-reveal mechanic.
 */
export function PitchInvitation({ data }: { data: InvitationSection }) {
  const [open, setOpen] = useState(false);
  const { prospect, tenant, editable } = data;

  // When the letter mounts (after the trigger exits), bring its top into view
  // so the note is in focus rather than opening off-screen below the fold.
  const scrollLetterIntoView = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    requestAnimationFrame(() =>
      node.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  }, []);

  const introParas = (editable.paragraphs ?? []).flatMap(splitParagraphs);
  const noteParas = splitParagraphs(prospect.note);
  const closingParas = splitParagraphs(prospect.closing);

  const hasNote =
    isMeaningful(prospect.greeting) ||
    noteParas.length > 0 ||
    closingParas.length > 0;

  const hasBg = isMeaningful(tenant.backgroundImage?.src);

  return (
    <section
      id={SectionId.invitation}
      className="tp-section tp-invitation"
      aria-label={editable.label ?? "Exclusive invitation"}
    >
      {hasBg && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="tp-invitation__bg"
            src={tenant.backgroundImage!.src}
            alt=""
            aria-hidden="true"
          />
          <div className="tp-invitation__scrim" aria-hidden="true" />
        </>
      )}

      <div className="tp-container tp-invitation__inner">
        {editable.headline && (
          <>
            <MobileEyebrow label="Invitation" />
            <Headline
              data={editable.headline}
              className="tp-display tp-display--lg tp-invitation__heading"
            />
          </>
        )}
        {introParas.length > 0 && (
          <div className="tp-invitation__intro">
            {introParas.map((p, i) => (
              <p key={i} className="tp-body tp-body--lg">
                {p}
              </p>
            ))}
          </div>
        )}

        {hasNote && (
          <AnimatePresence mode="wait">
            {!open ? (
              <motion.button
                key="trigger"
                className="tp-invitation__trigger"
                onClick={() => setOpen(true)}
                initial={{ opacity: 0, scale: 0.88, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15, ease: "easeIn" } }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                aria-label="Open personal note"
              >
                <span className="tp-invitation__trigger-ring" />
                <span className="tp-invitation__trigger-ring tp-invitation__trigger-ring--2" />
                {isMeaningful(tenant.contactPortraitImage) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tenant.contactPortraitImage}
                    alt={tenant.contactName}
                    className="tp-invitation__trigger-avatar"
                  />
                )}
                <span className="tp-invitation__trigger-hint">
                  A personal note from {tenant.contactName}
                </span>
              </motion.button>
            ) : (
              <motion.div
                key="card"
                ref={scrollLetterIntoView}
                className="tp-invitation__card"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
              >
                <button
                  className="tp-invitation__card-close"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                <div className="tp-invitation__card-body">
                  {isMeaningful(prospect.greeting) && <p>{prospect.greeting}</p>}
                  {noteParas.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {closingParas.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}

                  {isMeaningful(tenant.signatureImage) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={tenant.signatureImage}
                      alt={`${tenant.contactName} signature`}
                      className="tp-invitation__signature-img"
                    />
                  )}

                  <div className="tp-invitation__contact">
                    {isMeaningful(tenant.contactPortraitImage) && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={tenant.contactPortraitImage}
                        alt={tenant.contactName}
                        className="tp-invitation__contact-portrait"
                      />
                    )}
                    <div className="tp-invitation__contact-info">
                      {isMeaningful(tenant.contactName) && <strong>{tenant.contactName}</strong>}
                      {isMeaningful(tenant.contactRole) && <span>{tenant.contactRole}</span>}
                      {isMeaningful(tenant.contactEmail) && (
                        <a href={`mailto:${tenant.contactEmail}`}>{tenant.contactEmail}</a>
                      )}
                      {isMeaningful(tenant.contactPhone) && <span>{tenant.contactPhone}</span>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {isMeaningful(editable.ctaLabel) && isMeaningful(editable.ctaHref) && (
          <a href={editable.ctaHref} className="tp-btn tp-btn--primary tp-invitation__cta">
            {editable.ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}
