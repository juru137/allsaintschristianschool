import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Download, Mail, Phone } from "lucide-react";
import {
  ACADEMIC_RULES,
  ADMIN,
  APPLICATION_STEPS,
  DASHBOARD_EVENTS,
  FEE_ITEMS,
  GOVERNANCE_ROLES,
  NOTICES,
  PERFORMANCE_HIGHLIGHTS,
  PUBLIC_COPY,
  PUBLIC_PAGE_METADATA,
  SITE,
} from "../../constants";
import { PageIntro, PublicPageFrame } from "../../components/public-page-frame";
import { PublicImage } from "../../components/public-site";
import { ApplicationRequestForm } from "../../components/application-request-form";
import { SchoolPrefectCards, WeeklyAwardCards } from "../../components/student-recognition";
import { ScrollRevealGrid } from "../../components/scroll-reveal-grid";

type Section = keyof typeof PUBLIC_PAGE_METADATA;

export function generateStaticParams() {
  return Object.entries(PUBLIC_PAGE_METADATA).flatMap(([section, pages]) =>
    Object.keys(pages).map((slug) => ({ section, slug })),
  );
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  const pages = PUBLIC_PAGE_METADATA[section as Section] ?? {};
  const page = pages[slug];
  if (!page) notFound();

  return (
    <PublicPageFrame>
      <PageIntro eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <div className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        {section === "academics" && slug === "performance" && (
          <div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SITE.stats.map((stat) => (
                <div key={stat.label} className="border-l-2 border-[rgb(var(--accent))] bg-[rgb(var(--card))] p-5">
                  <div className="text-3xl font-bold text-[rgb(var(--fg))]">{stat.value}{stat.suffix}</div>
                  <div className="mt-1 text-sm text-[rgb(var(--muted))]">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {PERFORMANCE_HIGHLIGHTS.map((item) => (
                <article key={item.student} className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">{PUBLIC_COPY.page.topPerformer}</div>
                  <h2 className="mt-3 text-xl font-bold text-[rgb(var(--fg))]">{item.student}</h2>
                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-[rgb(var(--border))] pt-3">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[rgb(var(--muted))]">{PUBLIC_COPY.page.subject}</div>
                      <div className="mt-1 font-semibold text-[rgb(var(--fg))]">{item.subject}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs uppercase tracking-wider text-[rgb(var(--muted))]">{PUBLIC_COPY.page.grade}</div>
                      <div className="mt-1 text-lg font-bold text-[rgb(var(--accent))]">{item.grade}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[rgb(var(--muted))]">{item.remark}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 max-w-3xl text-sm leading-7 text-[rgb(var(--muted))]">
              <h2 className="text-xl font-semibold text-[rgb(var(--fg))]">{PUBLIC_COPY.page.learningTitle}</h2>
              <p className="mt-3">{PUBLIC_COPY.page.learningDescription}</p>
            </div>
          </div>
        )}

        {section === "academics" && slug === "academic-calendar" && (
          <div className="grid gap-3 md:grid-cols-2">
            {DASHBOARD_EVENTS.map((event) => (
              <article key={event.title} className="flex items-center gap-4 border-b border-[rgb(var(--border))] py-4">
                <div className="min-w-24 text-sm font-semibold text-[rgb(var(--accent))]">{event.date}</div>
                <div>
                  <h2 className="font-semibold text-[rgb(var(--fg))]">{event.title}</h2>
                  <p className="mt-1 text-sm text-[rgb(var(--muted))]">{event.time}</p>
                </div>
              </article>
            ))}
          </div>
        )}

        {section === "academics" && slug === "rules-and-regulations" && (
          <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            {ACADEMIC_RULES.map(({ title, body }) => (
              <article key={title} className="border-t-2 border-[rgb(var(--accent))] pt-4">
                <h2 className="font-semibold text-[rgb(var(--fg))]">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted))]">{body}</p>
              </article>
            ))}
          </div>
        )}

        {section === "admissions" && slug === "apply-now" && (
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <aside className="lg:sticky lg:top-24">
              <h2 className="text-xl font-semibold text-[rgb(var(--fg))]">{PUBLIC_COPY.page.gettingStarted}</h2>
              <ol className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {APPLICATION_STEPS.map((step, index) => (
                  <li key={step} className="border-t border-[rgb(var(--border))] pt-4">
                    <span className="text-sm font-bold text-[rgb(var(--accent))]">0{index + 1}</span>
                    <p className="mt-2 text-sm leading-6 text-[rgb(var(--fg))]">{step}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/admissions/download-form" className="inline-flex items-center gap-2 rounded-md bg-[rgb(var(--accent-fill))] px-4 py-2.5 text-sm font-semibold text-white"><Download size={16} />Download Form</Link>
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 rounded-md border border-[rgb(var(--border))] px-4 py-2.5 text-sm font-semibold text-[rgb(var(--fg))]"><Mail size={16} />{PUBLIC_COPY.page.askAdmissions}</a>
              </div>
            </aside>
            <ApplicationRequestForm />
          </div>
        )}

        {section === "admissions" && slug === "download-form" && (
          <div className="max-w-3xl border-y border-[rgb(var(--border))] py-6">
            <p className="text-sm leading-6 text-[rgb(var(--muted))]">{PUBLIC_COPY.page.downloadFormDescription}</p>
            <a href="/downloads/admission-application-form.html" download className="mt-5 inline-flex items-center gap-2 rounded-full bg-[rgb(var(--accent-fill))] px-5 py-3 text-sm font-semibold text-white"><Download size={16} />{PUBLIC_COPY.page.downloadApplicationForm}</a>
          </div>
        )}

        {section === "admissions" && slug === "fees-structure" && (
          <div className="max-w-3xl">
            <div className="overflow-x-auto border-y border-[rgb(var(--border))]">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead><tr className="border-b border-[rgb(var(--border))] text-[rgb(var(--muted))]"><th className="py-3 pr-4 font-medium">{PUBLIC_COPY.page.feeItem}</th><th className="py-3 font-medium">{PUBLIC_COPY.page.feeDetails}</th></tr></thead>
                <tbody>{FEE_ITEMS.map((item) => <tr key={item} className="border-b border-[rgb(var(--border))]/70"><th className="py-3 pr-4 font-medium text-[rgb(var(--fg))]">{item}</th><td className="py-3 text-[rgb(var(--muted))]">{PUBLIC_COPY.page.feeRates}</td></tr>)}</tbody>
              </table>
            </div>
            <a href={`tel:${SITE.phones[0].replace(/\s/g, "")}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--accent))]"><Phone size={16} />{PUBLIC_COPY.page.callAdmissions}</a>
          </div>
        )}

        {section === "administration" && slug === "leaderboard" && (
          <div className="space-y-14">
            <section aria-labelledby="administration-heading">
              <div className="mb-6 border-b border-[rgb(var(--border))] pb-3">
                <p className="text-xs font-semibold uppercase text-[rgb(var(--accent))]">{PUBLIC_COPY.page.leadershipEyebrow}</p>
                <h2 id="administration-heading" className="mt-1 text-2xl font-bold text-[rgb(var(--fg))]">{PUBLIC_COPY.page.leadershipTitle}</h2>
              </div>
              <ScrollRevealGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {ADMIN.map((person, index) => (
                  <article key={person.name} className="text-center">
                    <div className="mx-auto h-40 w-40 overflow-hidden rounded-full bg-[rgb(var(--border))]">
                      <PublicImage folder="/assets/images/leadership" index={index + 1} alt={person.name} className="h-full w-full object-cover" />
                    </div>
                    <h3 className="mt-4 font-semibold text-[rgb(var(--fg))]">{person.name}</h3>
                    <p className="mt-1 text-xs uppercase text-[rgb(var(--muted))]">{person.role}</p>
                  </article>
                ))}
              </ScrollRevealGrid>
            </section>

            <section aria-labelledby="prefects-heading">
              <div className="mb-6 border-b border-[rgb(var(--border))] pb-3">
                <p className="text-xs font-semibold uppercase text-[rgb(var(--accent))]">{PUBLIC_COPY.page.prefectsEyebrow}</p>
                <h2 id="prefects-heading" className="mt-1 text-2xl font-bold text-[rgb(var(--fg))]">{PUBLIC_COPY.page.prefectsTitle}</h2>
              </div>
              <SchoolPrefectCards />
            </section>

            <section aria-labelledby="weekly-awards-heading">
              <div className="mb-6 border-b border-[rgb(var(--border))] pb-3">
                <p className="text-xs font-semibold uppercase text-[rgb(var(--accent))]">{PUBLIC_COPY.page.awardsEyebrow}</p>
                <h2 id="weekly-awards-heading" className="mt-1 text-2xl font-bold text-[rgb(var(--fg))]">{PUBLIC_COPY.page.awardsTitle}</h2>
              </div>
              <WeeklyAwardCards />
            </section>
          </div>
        )}

        {section === "administration" && slug === "noticeboard" && (
          <div className="divide-y divide-[rgb(var(--border))]">
            {NOTICES.map((notice) => (
              <article key={notice.title} className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <div className="text-sm text-[rgb(var(--muted))]">{notice.date}</div>
                <div><span className="text-xs font-semibold uppercase text-[rgb(var(--accent))]">{notice.tag}</span><h2 className="mt-1 text-lg font-semibold text-[rgb(var(--fg))]">{notice.title}</h2><p className="mt-2 text-sm leading-6 text-[rgb(var(--muted))]">{notice.body}</p></div>
              </article>
            ))}
          </div>
        )}

        {section === "administration" && slug === "board-of-governance" && (
          <div className="max-w-3xl">
            <p className="text-sm leading-7 text-[rgb(var(--muted))]">{PUBLIC_COPY.page.boardDescription}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {GOVERNANCE_ROLES.map((role) => (
                <article key={role.title} className="border-l-2 border-[rgb(var(--accent))] bg-[rgb(var(--card))] p-4"><p className="text-xs uppercase text-[rgb(var(--muted))]">{role.title}</p><h2 className="mt-1 font-semibold text-[rgb(var(--fg))]">{role.description} {PUBLIC_COPY.page.boardDetailsSuffix}</h2></article>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 border-t border-[rgb(var(--border))] pt-6">
          <Link href="/contact-us" className="inline-flex items-center gap-2 text-sm font-semibold text-[rgb(var(--accent))]">{PUBLIC_COPY.page.contactSchool} <ArrowRight size={16} /></Link>
        </div>
      </div>
    </PublicPageFrame>
  );
}