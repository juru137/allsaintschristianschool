"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";
import {
  Camera,
  ChevronDown,
  Globe,
  LockKeyhole,
  Menu,
  MessageCircle,
  Moon,
  Music2,
  Play,
  Sun,
  Send,
  X,
} from "lucide-react";
import { PUBLIC_COPY, PUBLIC_NAV_GROUPS, SITE } from "../constants";

const SOCIAL_ICONS = { Camera, Globe, Music2, Play };

type PublicSiteConfig = Pick<
  typeof SITE,
  | "motto" | "name" | "logoAlt" | "location" | "phones" | "email"
  | "applyButtonLabel" | "logos" | "whatsappNumber"
>;

export function PublicHeader({
  onPortalClick,
  site = SITE,
}: {
  onPortalClick?: () => void;
  site?: PublicSiteConfig;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState("");
  const [openGroup, setOpenGroup] = useState("");
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    const nextDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
    setDark(nextDark);
  };

  return (
    <>
      <div className="utility-bar relative flex min-h-8 flex-wrap items-center justify-between gap-x-4 gap-y-1 bg-[rgb(var(--brand))] px-4 py-1.5 text-[0.7rem] leading-snug text-white sm:px-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>{site.motto}</span>
          <span className="text-[rgb(var(--accent-secondary))]">•</span>
          <span>{site.location}</span>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <a href={`tel:${site.phones[0].replace(/\s/g, "")}`} className="hover:underline">
            {site.phones[0]}
          </a>
          <a href={`mailto:${site.email}`} className="hover:underline">
            {site.email}
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-[rgb(var(--border))] bg-[rgb(var(--card))]/95 backdrop-blur">
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-3 py-2 sm:px-5">
          <Link href="/" className="flex min-w-0 items-center px-1 text-[rgb(var(--fg))]">
            <Image
              src={site.logos.header}
              alt={site.logoAlt}
              width={120}
              height={120}
              className="h-[120px] w-[120px] flex-shrink-0 object-contain"
            />
          </Link>

          <nav aria-label={PUBLIC_COPY.navigation.mainLabel} className="hidden items-center gap-2 xl:ml-14 xl:flex xl:gap-3">
            <Link href="/" className="nav-underline rounded-full px-2.5 py-2 text-sm font-medium text-[rgb(var(--fg))]/80 hover:text-[rgb(var(--fg))]">
              {PUBLIC_COPY.navigation.home}
            </Link>
            {PUBLIC_NAV_GROUPS.map((group) => (
              <div
                key={group.label}
                className="relative py-2"
                onMouseEnter={() => setOpenGroup(group.label)}
                onMouseLeave={() => setOpenGroup((current) => (current === group.label ? "" : current))}
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-sm font-medium text-[rgb(var(--fg))]/80 transition hover:bg-[rgb(var(--border))]/40 hover:text-[rgb(var(--fg))]"
                  aria-haspopup="true"
                  aria-expanded={openGroup === group.label}
                  onClick={() => setOpenGroup((current) => (current === group.label ? "" : group.label))}
                  onFocus={() => setOpenGroup(group.label)}
                  onBlur={() => setOpenGroup((current) => (current === group.label ? "" : current))}
                >
                  {group.label}
                  <ChevronDown size={15} aria-hidden="true" />
                </button>
                <div
                  className={`absolute left-0 top-full z-50 w-60 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-1 shadow-xl transition duration-150 ${
                    openGroup === group.label
                      ? "visible translate-y-0 opacity-100"
                      : "pointer-events-none invisible translate-y-1 opacity-0"
                  }`}
                  onMouseEnter={() => setOpenGroup(group.label)}
                  onMouseLeave={() => setOpenGroup((current) => (current === group.label ? "" : current))}
                >
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpenGroup("")}
                      className="block rounded-md px-3 py-2.5 text-sm text-[rgb(var(--fg))]/80 transition hover:bg-[rgb(var(--border))]/40 hover:text-[rgb(var(--fg))]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link href="/gallery" className="rounded-full px-2.5 py-2 text-sm font-medium text-[rgb(var(--fg))]/80 hover:bg-[rgb(var(--border))]/40 hover:text-[rgb(var(--fg))]">
              {PUBLIC_COPY.navigation.gallery}
            </Link>
            <Link href="/contact-us" className="rounded-full px-2.5 py-2 text-sm font-medium text-[rgb(var(--fg))]/80 hover:bg-[rgb(var(--border))]/40 hover:text-[rgb(var(--fg))]">
              {PUBLIC_COPY.navigation.contact}
            </Link>
          </nav>

          <div className="ml-auto flex flex-shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={dark ? PUBLIC_COPY.navigation.switchToLight : PUBLIC_COPY.navigation.switchToDark}
              title={dark ? PUBLIC_COPY.navigation.switchToLight : PUBLIC_COPY.navigation.switchToDark}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgb(var(--border))] text-[rgb(var(--fg))]"
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            {onPortalClick ? (
              <button type="button" onClick={onPortalClick} className="hidden items-center gap-1.5 rounded-full border border-[rgb(var(--border))] px-3 py-2 text-xs font-semibold text-[rgb(var(--fg))] xl:inline-flex">
                <LockKeyhole size={14} />{PUBLIC_COPY.navigation.portal}
              </button>
            ) : (
              <Link href="/?portal=1" className="hidden items-center gap-1.5 rounded-full border border-[rgb(var(--border))] px-3 py-2 text-xs font-semibold text-[rgb(var(--fg))] xl:inline-flex">
                <LockKeyhole size={14} />{PUBLIC_COPY.navigation.portal}
              </Link>
            )}
            <Link href="/admissions/apply-now" className="rounded-full bg-[rgb(var(--accent-fill))] px-3.5 py-2 text-xs font-semibold text-white sm:text-sm">
              {site.applyButtonLabel}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? PUBLIC_COPY.navigation.closeMenu : PUBLIC_COPY.navigation.openMenu}
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[rgb(var(--border))] text-[rgb(var(--fg))] xl:hidden"
            >
              {mobileOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>

          {mobileOpen && (
            <nav aria-label={PUBLIC_COPY.navigation.mobileLabel} className="absolute inset-x-0 top-full z-50 max-h-[calc(100svh-5rem)] overflow-y-auto border-b border-[rgb(var(--border))] bg-[rgb(var(--card))] p-3 shadow-xl xl:hidden">
              <Link href="/" onClick={() => setMobileOpen(false)} className="block rounded-md px-3 py-3 text-sm font-medium hover:bg-[rgb(var(--border))]/40">
                {PUBLIC_COPY.navigation.home}
              </Link>
              {PUBLIC_NAV_GROUPS.map((group) => (
                <div key={group.label} className="border-t border-[rgb(var(--border))]/70">
                  <button
                    type="button"
                    onClick={() => setExpandedGroup((open) => open === group.label ? "" : group.label)}
                    aria-expanded={expandedGroup === group.label}
                    className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm font-semibold"
                  >
                    {group.label}
                    <ChevronDown size={16} className={expandedGroup === group.label ? "rotate-180 transition-transform" : "transition-transform"} />
                  </button>
                  {expandedGroup === group.label && (
                    <div className="grid gap-1 pb-2 pl-3">
                      {group.links.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm text-[rgb(var(--muted))] hover:bg-[rgb(var(--border))]/40 hover:text-[rgb(var(--fg))]">
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="grid grid-cols-2 gap-1 border-t border-[rgb(var(--border))]/70 pt-1">
                <Link href="/gallery" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-3 text-sm font-medium hover:bg-[rgb(var(--border))]/40">{PUBLIC_COPY.navigation.gallery}</Link>
                <Link href="/contact-us" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-3 text-sm font-medium hover:bg-[rgb(var(--border))]/40">{PUBLIC_COPY.navigation.contact}</Link>
                <Link href="/admissions/download-form" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-3 text-sm font-medium hover:bg-[rgb(var(--border))]/40">{PUBLIC_COPY.navigation.downloadForm}</Link>
                {onPortalClick ? (
                  <button type="button" onClick={() => { setMobileOpen(false); onPortalClick(); }} className="rounded-md px-3 py-3 text-left text-sm font-medium hover:bg-[rgb(var(--border))]/40">{PUBLIC_COPY.navigation.portalLogin}</button>
                ) : (
                  <Link href="/?portal=1" onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-3 text-sm font-medium hover:bg-[rgb(var(--border))]/40">{PUBLIC_COPY.navigation.portalLogin}</Link>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}

export function PublicFooter({ site = SITE }: { site?: PublicSiteConfig }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState(PUBLIC_COPY.footer.whatsappMessage);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chatOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !chatRef.current?.contains(event.target)) {
        setChatOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setChatOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [chatOpen]);

  const sendWhatsAppMessage = () => {
    const phoneNumber = site.whatsappNumber.replace(/\D/g, "");
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message.trim())}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setChatOpen(false);
  };

  return (
    <footer className="relative border-t border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <Link href="/" className="flex items-center gap-3 text-[rgb(var(--fg))]">
            <Image src={site.logos.footer} alt={site.logoAlt} width={120} height={120} className="h-[120px] w-[120px] flex-shrink-0 object-contain" />
            <span className="font-bold">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-[rgb(var(--muted))]">
            {PUBLIC_COPY.footer.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {PUBLIC_COPY.footer.socialLinks.map(({ label, href, icon }) => {
              const Icon = SOCIAL_ICONS[icon as keyof typeof SOCIAL_ICONS];
              return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(var(--border))] text-[rgb(var(--muted))] transition hover:border-[rgb(var(--accent))] hover:text-[rgb(var(--accent))]"
              >
                <Icon size={16} />
              </a>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[rgb(var(--fg))]">{PUBLIC_COPY.footer.exploreTitle}</h2>
          <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--muted))]">
            {PUBLIC_COPY.footer.exploreLinks.map((link) => <li key={link.href}><Link href={link.href} className="hover:text-[rgb(var(--fg))]">{link.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[rgb(var(--fg))]">{PUBLIC_COPY.footer.admissionsTitle}</h2>
          <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--muted))]">
            {PUBLIC_COPY.footer.admissionsLinks.map((link) => <li key={link.href}><Link href={link.href} className="hover:text-[rgb(var(--fg))]">{link.label}</Link></li>)}
          </ul>
        </div>
      </div>
      <div className="border-t border-[rgb(var(--border))] px-5 py-4 text-center text-xs text-[rgb(var(--muted))]">
        © {new Date().getFullYear()} {site.name}. {PUBLIC_COPY.footer.rightsReserved}
      </div>

      <div ref={chatRef} className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {chatOpen && (
          <section
            role="dialog"
            aria-label={PUBLIC_COPY.footer.whatsappLabel}
            className="w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] text-[rgb(var(--fg))] shadow-2xl"
          >
            <header className="flex items-center justify-between bg-[#128C4A] px-4 py-3 text-white">
              <div className="flex items-center gap-2 font-semibold">
                <MessageCircle size={18} aria-hidden="true" />
                <span>{PUBLIC_COPY.footer.whatsappLabel}</span>
              </div>
              <button type="button" onClick={() => setChatOpen(false)} aria-label="Close chat" className="rounded p-1 hover:bg-white/15">
                <X size={18} />
              </button>
            </header>
            <div className="p-4">
              <p className="mb-3 text-sm text-[rgb(var(--muted))]">Send us a message on WhatsApp.</p>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={4}
                aria-label="Your WhatsApp message"
                className="w-full resize-y rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-3 text-sm outline-none focus:border-[#25D366]"
              />
              <button
                type="button"
                onClick={sendWhatsAppMessage}
                disabled={!message.trim()}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#128C4A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0e753d] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send size={16} />
                Continue to WhatsApp
              </button>
            </div>
          </section>
        )}
        <button
          type="button"
          onClick={() => setChatOpen((open) => !open)}
          aria-label={PUBLIC_COPY.footer.whatsappLabel}
          aria-expanded={chatOpen}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_35px_rgba(37,211,102,0.35)] transition hover:scale-105"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    </footer>
  );
}

export function PublicImage({
  folder,
  index,
  alt,
  ...props
}: { folder: string; index: number; alt: string } & ImgHTMLAttributes<HTMLImageElement>) {
  const sources = ["jpg", "png", "svg"].map(
    (extension) => `${folder}/image_${String(index).padStart(2, "0")}.${extension}`,
  );
  const [sourceIndex, setSourceIndex] = useState(0);
  const src = sources[sourceIndex];

  if (!src) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setSourceIndex((current) => current + 1)}
    />
  );
}