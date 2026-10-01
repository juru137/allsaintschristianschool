"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GALLERY, PUBLIC_COPY } from "../constants";
import { ScrollRevealGrid } from "./scroll-reveal-grid";

const FILTERS = [PUBLIC_COPY.gallery.allFilter, ...new Set(GALLERY.map((item) => item.category))] as const;
type Filter = (typeof FILTERS)[number];

export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>(FILTERS[0]);
  const [active, setActive] = useState<(typeof GALLERY)[number] | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const items = GALLERY.filter((item) => filter === PUBLIC_COPY.gallery.allFilter || item.category === filter);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setImageIndex((index) => (index + 1) % active.images.length);
      if (event.key === "ArrowLeft") setImageIndex((index) => (index - 1 + active.images.length) % active.images.length);
    };
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  const close = () => setActive(null);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label={PUBLIC_COPY.gallery.filterGroup}>
        {FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filter === option ? "bg-[rgb(var(--accent-fill))] text-white" : "border border-[rgb(var(--border))] text-[rgb(var(--fg))] hover:bg-[rgb(var(--border))]/40"}`}
          >
            {option}
          </button>
        ))}
      </div>

      <ScrollRevealGrid className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => { setActive(item); setImageIndex(0); }}
            className="group card-lift text-left"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[rgb(var(--border))]">
              <Image src={item.images[0]} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
            </div>
            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold text-[rgb(var(--fg))]">{item.title}</h2>
                <p className="mt-1 max-w-md text-sm leading-6 text-[rgb(var(--muted))]">{item.description}</p>
              </div>
              <span className="mt-1 flex-shrink-0 text-[0.65rem] font-semibold uppercase text-[rgb(var(--accent))]">{item.category}</span>
            </div>
          </button>
        ))}
      </ScrollRevealGrid>

      {active && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/95 p-4 text-white sm:p-6" role="dialog" aria-modal="true" aria-label={`${active.title} ${PUBLIC_COPY.gallery.dialogSuffix}`} onClick={close}>
          <div className="flex items-start justify-between gap-4" onClick={(event) => event.stopPropagation()}>
            <div>
              <h2 className="text-lg font-bold">{active.title}</h2>
              <p className="mt-1 text-sm text-white/60">{PUBLIC_COPY.gallery.imageCount} {imageIndex + 1} of {active.images.length}</p>
            </div>
            <button type="button" onClick={close} aria-label={PUBLIC_COPY.gallery.close} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20"><X size={18} /></button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center py-5" onClick={(event) => event.stopPropagation()}>
            <button type="button" aria-label={PUBLIC_COPY.gallery.previous} onClick={() => setImageIndex((index) => (index - 1 + active.images.length) % active.images.length)} className="absolute left-0 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10"><ChevronLeft /></button>
            <div className="relative h-full max-h-[72vh] w-full max-w-5xl">
              <Image key={`${active.id}-${imageIndex}`} src={active.images[imageIndex]} alt={`${active.title}, ${PUBLIC_COPY.gallery.imageAltPrefix} ${imageIndex + 1}`} fill sizes="90vw" className="object-contain" />
            </div>
            <button type="button" aria-label={PUBLIC_COPY.gallery.next} onClick={() => setImageIndex((index) => (index + 1) % active.images.length)} className="absolute right-0 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10"><ChevronRight /></button>
          </div>
        </div>
      )}
    </>
  );
}