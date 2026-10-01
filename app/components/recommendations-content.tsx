import { PUBLIC_COPY } from "../constants";

export function RecommendationsContent({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "py-14" : "py-10 sm:py-14"}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">{PUBLIC_COPY.recommendations.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-bold text-[rgb(var(--fg))] sm:text-3xl">{PUBLIC_COPY.recommendations.title}</h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {PUBLIC_COPY.recommendations.items.map((item) => (
            <article key={item.number} className="border-t border-[rgb(var(--border))] pt-4">
              <span className="text-xs font-bold text-[rgb(var(--accent))]">{item.number}</span>
              <h3 className="mt-2 font-semibold text-[rgb(var(--fg))]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted))]">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}