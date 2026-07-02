"use client";

import { useReveal } from "@/lib/animations";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

export function Reveal({ children, className, delay = 0 }: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`tp-reveal ${visible ? "is-visible" : ""} ${
        className ?? ""
      }`.trim()}
      {...(delay > 0 ? { "data-delay": String(delay) } : {})}
    >
      {children}
    </div>
  );
}
