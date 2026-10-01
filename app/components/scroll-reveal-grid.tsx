"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ScrollRevealGrid({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(grid.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = entry.target as HTMLElement;
          item.classList.remove("scroll-reveal-pending");
          item.classList.add("scroll-reveal-in");
          observer.unobserve(item);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );

    items.forEach((item, index) => {
      item.classList.add("scroll-reveal-pending");
      item.style.setProperty("--reveal-delay", `${Math.min(index * 70, 350)}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [children]);

  return <div ref={gridRef} className={className}>{children}</div>;
}