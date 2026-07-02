"use client";

import { useReveal } from "@/lib/animations";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

// <Reveal> renders a <div>; this variant renders an <li> for use inside
// <ol>/<ul> where wrapping divs would be invalid HTML.
export function RevealLi({ children, className, delay = 0 }: Props) {
  const { ref, visible } = useReveal<HTMLLIElement>();
  return (
    <li
      ref={ref}
      className={`tp-reveal ${visible ? "is-visible" : ""} ${
        className ?? ""
      }`.trim()}
      {...(delay > 0 ? { "data-delay": String(delay) } : {})}
    >
      {children}
    </li>
  );
}
