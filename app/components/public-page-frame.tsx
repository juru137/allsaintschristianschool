import type { ReactNode } from "react";
import { PublicFooter, PublicHeader } from "./public-site";

export function PublicPageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
          {eyebrow}
        </p>
        <h1 className="mt-2 max-w-4xl text-3xl font-bold leading-tight text-[rgb(var(--fg))] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[rgb(var(--muted))]">
          {description}
        </p>
      </div>
    </div>
  );
}