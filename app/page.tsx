/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  createContext,
  JSX,
  useContext,
  useEffect,
  useRef,
  useState,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  ADMIN,
  ADMIN_CREDENTIALS,
  DASHBOARD_COPY,
  DASHBOARD_NAV_ITEMS,
  CONTACT,
  DASHBOARD_EVENTS,
  DASHBOARD_FINANCE,
  DASHBOARD_STAFF,
  DASHBOARD_STUDENTS,
  GALLERY,
  NOTICES,
  PUBLIC_COPY,
  PORTAL_COPY,
  SCHOOL_STORY,
  SITE,
} from "./constants";
import { PublicFooter, PublicHeader } from "./components/public-site";
import { RecommendationsContent } from "./components/recommendations-content";
import { PerformanceStudentCards, WeeklyAwardCards } from "./components/student-recognition";
import { ScrollRevealGrid } from "./components/scroll-reveal-grid";

/* ============================================================
   1. DEFAULT SITE CONTENT
   ============================================================ */
type SiteConfig = typeof SITE;

const DEFAULT_SITE: SiteConfig = SITE;

/* ============================================================
   2. ROUTING + STATIC CONTENT
   ============================================================ */
/* ============================================================
   3. SITE CONTENT CONTEXT
   ============================================================ */
const SITE_KEY = "site-config-v1";
const SiteCtx = createContext<{
  site: SiteConfig;
  setSite: (s: SiteConfig) => void;
  reset: () => void;
} | null>(null);

function SiteContentProvider({ children }: { children: ReactNode }) {
  const [site, setSiteState] = useState<SiteConfig>(DEFAULT_SITE);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SITE_KEY);
      if (raw) {
        setSiteState({
          ...DEFAULT_SITE,
          ...JSON.parse(raw),
          heroSlides: DEFAULT_SITE.heroSlides,
        });
      }
    } catch {}
  }, []);

  const setSite = (s: SiteConfig) => {
    const localSite = { ...s, heroSlides: DEFAULT_SITE.heroSlides };
    setSiteState(localSite);
    try {
      localStorage.setItem(SITE_KEY, JSON.stringify(localSite));
    } catch {}
  };
  const reset = () => {
    setSiteState(DEFAULT_SITE);
    try {
      localStorage.removeItem(SITE_KEY);
    } catch {}
  };

  return (
    <SiteCtx.Provider value={{ site, setSite, reset }}>
      {children}
    </SiteCtx.Provider>
  );
}
function useSite() {
  const ctx = useContext(SiteCtx);
  if (!ctx) throw new Error("useSite outside provider");
  return ctx;
}

/* ============================================================
   4. THEME CONTEXT
   ============================================================ */
type Theme = "light" | "dark" | "system";
const THEME_KEY = "theme";
const ThemeCtx = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolved: "light" | "dark";
} | null>(null);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolved, setResolved] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = (localStorage.getItem(THEME_KEY) as Theme) || "system";
    setThemeState(saved);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const isDark = theme === "dark" || (theme === "system" && mq.matches);
      document.documentElement.classList.toggle("dark", isDark);
      setResolved(isDark ? "dark" : "light");
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem(THEME_KEY, t);
  };

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, resolved }}>
      {children}
    </ThemeCtx.Provider>
  );
}
function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme outside provider");
  return ctx;
}

/* ============================================================
   5. AUTH CONTEXT
   ============================================================ */
const AUTH_KEY = "auth-session";
const AuthCtx = createContext<{
  user: { username: string } | null;
  login: (u: string, p: string) => boolean;
  logout: () => void;
} | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(AUTH_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const login = (username: string, password: string) => {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const u = { username };
      setUser(u);
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthCtx.Provider value={{ user, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}
function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth outside provider");
  return ctx;
}

/* ============================================================
   6. SCROLL SPY HOOK
   ============================================================ */
function useLocalImageSequence(folder: string, fallbackImages: string[]) {
  const [localImages, setLocalImages] = useState<string[]>(() => fallbackImages);

  useEffect(() => {
    let cancelled = false;
    const fallback = Array.isArray(fallbackImages) ? fallbackImages : [];

    const readImages = async () => {
      const found: string[] = [];

      for (let index = 1; index <= 20; index += 1) {
        let foundSource = "";
        for (const extension of ["jpg", "png", "svg"]) {
          const src = `${folder}/image_${String(index).padStart(2, "0")}.${extension}`;
          const exists = await new Promise<boolean>((resolve) => {
            const image = new window.Image();
            image.onload = () => resolve(true);
            image.onerror = () => resolve(false);
            image.src = src;
          });
          if (exists) {
            foundSource = src;
            break;
          }
        }

        if (!foundSource) break;
        found.push(foundSource);
      }

      if (cancelled) return;

      setLocalImages((current) => {
        const next = found.length > 0 ? found : fallback;
        const changed =
          current.length !== next.length ||
          current.some((value, index) => value !== next[index]);

        return changed ? next : current;
      });
    };

    void readImages();

    return () => {
      cancelled = true;
    };
  }, [folder, fallbackImages]);

  return localImages;
}

function ImageWithFallback({
  sources,
  alt = "",
  ...props
}: { sources: string[] } & ImgHTMLAttributes<HTMLImageElement>) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const src = sources[sourceIndex];

  if (!src) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={src}
      alt={alt}
      onError={() => setSourceIndex((index) => index + 1)}
    />
  );
}

/* ============================================================
   7. ICONS
   ============================================================ */
const IconLocation = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
  </svg>
);
const IconPhone = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.25 1l-2.23 2.2Z" />
  </svg>
);
const IconMail = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.01L12 12l8-5.99V6H4Zm0 2.24V18h16V8.24l-8 5.99-8-5.99Z" />
  </svg>
);
const IconCalendar = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm12 8v10H5V10h14Z" />
  </svg>
);
const IconDownload = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 3a1 1 0 0 1 1 1v9.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 1 1 1.414-1.414L11 13.586V4a1 1 0 0 1 1-1ZM5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z" />
  </svg>
);
const IconSun = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Zm0-20a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V1a1 1 0 0 1 1-1Zm11 11a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1ZM4 12a1 1 0 0 1-1 1H1a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1Zm15.66-7.66a1 1 0 0 1 0 1.41l-1.42 1.42a1 1 0 1 1-1.41-1.41l1.41-1.42a1 1 0 0 1 1.42 0ZM5.76 16.83l1.41-1.41a1 1 0 1 1 1.42 1.41l-1.42 1.42a1 1 0 0 1-1.41-1.42Zm12.65 1.42-1.41-1.42a1 1 0 1 1 1.41-1.41l1.42 1.41a1 1 0 0 1-1.42 1.42ZM5.76 7.17 7.17 5.76a1 1 0 0 1 1.42 1.41L7.17 8.59a1 1 0 0 1-1.41-1.42Z" />
  </svg>
);
const IconMoon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
);
const IconSystem = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-6v2h3a1 1 0 1 1 0 2H7a1 1 0 1 1 0-2h3v-2H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm1 2v8h14V6H5Z" />
  </svg>
);
const IconLock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 1a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2V6a5 5 0 0 0-5-5Zm-3 8V6a3 3 0 1 1 6 0v3H9Zm3 5a2 2 0 0 1 1 3.73V19a1 1 0 1 1-2 0v-1.27A2 2 0 0 1 12 14Z" />
  </svg>
);
const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-2.76-3.58-5-8-5Z" />
  </svg>
);
const IconDashboard = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M3 3h8v10H3V3Zm0 12h8v6H3v-6Zm10-6h8v12h-8V9Zm0-6h8v4h-8V3Z" />
  </svg>
);
const IconStudents = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3ZM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82Z" />
  </svg>
);
const IconStaff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 0a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-2.67 0-8 1.34-8 4v3h9v-3c0-.86.36-1.65 1-2.31A12.67 12.67 0 0 0 8 13Zm8 0c-.9 0-1.9.13-2.87.38A4.65 4.65 0 0 1 14 16v3h9v-3c0-2.66-5.33-4-7-4Z" />
  </svg>
);
const IconFinance = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Zm-1 8h2v2h-2V9Zm0 4h2v2h-2v-2Z" />
  </svg>
);
const IconCalendarDash = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm12 8v10H5V10h14Z" />
  </svg>
);
const IconNotice = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM7 9h10v2H7V9Zm0 4h7v2H7v-2Z" />
  </svg>
);
const IconSettings = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm8.94 4-.86-1.5 2.04-1.36-2-3.46-2.31 1.03a8 8 0 0 0-1.3-.76L16 3h-4l-.51 2.45a8 8 0 0 0-1.3.76L7.88 5.18l-2 3.46 2.04 1.36L7.06 12l.86 1.5-2.04 1.36 2 3.46 2.31-1.03c.4.3.84.55 1.3.76L12 21h4l.51-2.45c.46-.21.9-.46 1.3-.76l2.31 1.03 2-3.46-2.04-1.36.86-1.5Z" />
  </svg>
);
const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M10 17v-2h4V9h-4V7l-5 5 5 5Zm9-15H5a2 2 0 0 0-2 2v4h2V4h14v16H5v-4H3v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
  </svg>
);
const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z" />
  </svg>
);
const IconMenu = ({ open = false }: { open?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    {open ? (
      <path d="m6.4 5 5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6 10.6 12 5 6.4 6.4 5Z" />
    ) : (
      <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
    )}
  </svg>
);

/* ============================================================
   8. SKELETON + COUNTUP + LOADING OVERLAY
   ============================================================ */
function CountUp({
  end,
  duration = 1400,
  suffix = "",
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const t0 = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - t0) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValue(Math.round(end * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

function LoadingOverlay() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[rgb(var(--bg))] transition-opacity duration-500 ${done ? "pointer-events-none opacity-0" : "opacity-100"}`}
      aria-hidden={done}
    >
      <div className="flex flex-col items-center gap-4">
        <svg width="56" height="56" viewBox="0 0 50 50" className="animate-spin">
          <circle cx="25" cy="25" r="20" fill="none" stroke="rgb(var(--border))" strokeWidth="4" />
          <circle cx="25" cy="25" r="20" fill="none" stroke="rgb(var(--accent))" strokeWidth="4" strokeLinecap="round" strokeDasharray="90 150" />
        </svg>
        <div className="text-sm text-[rgb(var(--muted))]">{PUBLIC_COPY.loading}</div>
      </div>
    </div>
  );
}

/* ============================================================
   9. THEME TOGGLE
   ============================================================ */
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const themeIcons = { light: IconSun, dark: IconMoon, system: IconSystem };
  return (
    <div className="inline-flex rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-0.5 text-xs">
      {DASHBOARD_COPY.themeOptions.map((option) => {
        const Icon = themeIcons[option.key];
        return (
        <button
          key={option.key}
          onClick={() => setTheme(option.key)}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 transition ${
            theme === option.key
              ? "bg-[rgb(var(--accent-fill))] text-white"
              : "text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]"
          }`}
          title={option.label}
          aria-label={option.label}
        >
          <Icon />
          <span className="hidden sm:inline">{option.label}</span>
        </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   10. HERO
   ============================================================ */
function Hero() {
  const { site } = useSite();
  const slides = useLocalImageSequence("/assets/images/carousel", site.heroSlides);
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      6000,
    );
    return () => clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    setLoaded(false);
    const img = new window.Image();
    img.src = slides[index];
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true);
  }, [index, slides]);

  return (
    <section
      id="home"
      className="relative h-[calc(100svh-6rem)] min-h-[520px] w-full overflow-hidden text-white"
    >
      {slides.map((src, i) => (
        <div
          key={src + i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <ImageWithFallback
            sources={[src, ...site.heroSlides]}
            key={src}
            alt=""
            className={`h-full w-full object-cover hero-zoom transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      ))}

      {!loaded && <div className="absolute inset-0 z-[1] shimmer" aria-hidden="true" />}

      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/60 dark:from-black/80 dark:via-black/60 dark:to-black/80" />
      <div className="absolute inset-0 bg-[rgb(var(--bg))]/10 dark:bg-black/30" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
        <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
          {site.heroTitle}
        </h1>

        <p className="mt-6 max-w-2xl text-base text-white/80 md:text-lg">
          {site.heroSubtitle}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#apply"
            className="btn-pop btn-red-sweep rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900"
          >
            {site.applyButtonLabel}
          </a>
          <a
            href="#administration"
            className="btn-pop btn-red-sweep rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
              {PUBLIC_COPY.hero.teamButton}
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
          {site.stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold md:text-4xl">
                <CountUp end={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/70">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIndex((current) => (current - 1 + slides.length) % slides.length)}
        aria-label="Previous carousel image"
        className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur transition hover:bg-black/55 sm:left-6"
      >
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => setIndex((current) => (current + 1) % slides.length)}
        aria-label="Next carousel image"
        className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur transition hover:bg-black/55 sm:right-6"
      >
        <ChevronRight size={22} aria-hidden="true" />
      </button>

      <a href="#students-of-the-week" aria-label={PUBLIC_COPY.hero.scrollToStudents} title={PUBLIC_COPY.hero.scrollDown} className="absolute bottom-5 left-1/2 z-20 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/50 bg-black/25 text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
        <ChevronDown className="scroll-cue" size={23} aria-hidden="true" />
      </a>
    </section>
  );
}

function OurStory() {
  const { site } = useSite();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStory = SCHOOL_STORY[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SCHOOL_STORY.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="our-story" className="overflow-hidden bg-[rgb(var(--brand))] py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--accent-secondary))]">A shared beginning, a growing community</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Our story</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">
            For more than two decades, All Saints has grown with the families it serves in Kampala, holding fast to a simple purpose: nurture faith, knowledge, and character in every learner.
          </p>

          <div className="mt-8 grid grid-cols-4 gap-2" role="tablist" aria-label="Our story timeline">
            {SCHOOL_STORY.map((story, index) => (
              <button
                key={story.chapter}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`${story.year}: ${story.chapter}`}
                onClick={() => setActiveIndex(index)}
                className="group min-w-0 text-left"
              >
                <span className={`block truncate text-[10px] font-semibold uppercase sm:text-xs ${index === activeIndex ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>
                  {story.year}
                </span>
                <span className="story-progress-track mt-2 block h-1 overflow-hidden rounded-full bg-white/20">
                  {index === activeIndex && <span key={activeIndex} className="story-progress-fill block h-full rounded-full bg-[rgb(var(--accent-secondary))]" />}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-7 min-h-40" aria-live="polite" aria-atomic="true">
            <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--accent-secondary))]">{activeStory.chapter}</p>
            <h3 className="mt-2 text-2xl font-semibold leading-snug">{activeStory.title}</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/75">{activeStory.description}</p>
          </div>

          <div className="mt-5 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-5">
            {site.stats.slice(0, 3).map((stat) => (
              <div key={stat.label}>
                <p className="text-xl font-bold sm:text-2xl">{stat.value.toLocaleString()}{stat.suffix}</p>
                <p className="mt-1 text-[10px] leading-snug text-white/60 sm:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[300px] overflow-hidden rounded-xl bg-black/20 sm:min-h-[420px]">
          {SCHOOL_STORY.map((story, index) => (
            <div key={story.image} className={`absolute inset-0 transition-opacity duration-700 ${index === activeIndex ? "opacity-100" : "opacity-0"}`} aria-hidden={index !== activeIndex}>
              <ImageWithFallback
                sources={[story.image]}
                alt={story.imageAlt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 text-sm font-medium text-white sm:bottom-7 sm:left-7">{story.imageAlt}</p>
            </div>
          ))}
          <span className="absolute right-4 top-4 rounded-full border border-white/35 bg-black/25 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{activeStory.year}</span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   11. GALLERY CARD — uniform size, varied transitions
   ============================================================ */
type TransitionStyle =
  | "fade"
  | "slide-left"
  | "slide-up"
  | "zoom-in"
  | "zoom-out"
  | "blur";

const TRANSITION_STYLES: TransitionStyle[] = [
  "fade",
  "slide-left",
  "zoom-in",
  "slide-up",
  "blur",
  "zoom-out",
];

/** Class names for the active (visible) image, per style. */
function activeClasses(style: TransitionStyle): string {
  switch (style) {
    case "fade":
      return "opacity-100 scale-100 translate-x-0 translate-y-0 blur-0";
    case "slide-left":
      return "opacity-100 translate-x-0 scale-100 blur-0";
    case "slide-up":
      return "opacity-100 translate-y-0 scale-100 blur-0";
    case "zoom-in":
      return "opacity-100 scale-100 blur-0";
    case "zoom-out":
      return "opacity-100 scale-100 blur-0";
    case "blur":
      return "opacity-100 blur-0 scale-100";
  }
}

/** Class names for the inactive (hidden) image, per style. */
function inactiveClasses(style: TransitionStyle): string {
  switch (style) {
    case "fade":
      return "opacity-0 scale-100 translate-x-0 translate-y-0 blur-0";
    case "slide-left":
      return "opacity-0 -translate-x-6 scale-100 blur-0";
    case "slide-up":
      return "opacity-0 translate-y-6 scale-100 blur-0";
    case "zoom-in":
      return "opacity-0 scale-110 blur-0";
    case "zoom-out":
      return "opacity-0 scale-90 blur-0";
    case "blur":
      return "opacity-0 blur-md scale-105";
  }
}

function GalleryCard({
  item,
  index,
  onOpen,
}: {
  item: (typeof GALLERY)[number];
  index: number;
  onOpen: (images: string[]) => void;
}) {
  const images = item.images;
  const [i, setI] = useState(0);
  const [hovering, setHovering] = useState(false);

  // Different interval per card: 2.8s → 4.8s, cycling every 5 cards.
  const interval = 2800 + (index % 5) * 500;

  // Rotate transition styles across cards.
  const style = TRANSITION_STYLES[index % TRANSITION_STYLES.length];

  useEffect(() => {
    if (hovering || images.length <= 1) return;

    const id = window.setInterval(() => {
      setI((current) => (current + 1) % images.length);
    }, interval);

    return () => window.clearInterval(id);
  }, [images, hovering, interval]);

  useEffect(() => {
    if (images.length > 0 && i >= images.length) {
      setI(0);
    }
  }, [i, images.length]);

  return (
    <button
      onClick={() => onOpen(images)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ aspectRatio: "4 / 3" }}
      className="group relative block w-full overflow-hidden rounded-2xl bg-neutral-200 text-left shadow-sm ring-1 ring-[rgb(var(--border))] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl"
    >
      {/* Slides */}
      {images.map((src, idx) => {
        const isActive = idx === i;
        return (
          <ImageWithFallback
            key={src}
            sources={[src, ...item.images]}
            alt=""
            loading="lazy"
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-out ${
              isActive ? activeClasses(style) : inactiveClasses(style)
            }`}
          />
        );
      })}

      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      {/* Content — padded, gap from image edge */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4 text-white sm:p-5">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="truncate text-base font-bold leading-tight sm:text-lg">
              {item.title}
            </div>
            <div className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/80 sm:text-xs">
              {item.description}
            </div>
          </div>
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-transform group-hover:scale-110 sm:h-9 sm:w-9">
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path
                d="M5 12h14m-6-6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
        </div>

        {/* Dots */}
        <div className="flex gap-1">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`h-1 rounded-full transition-all ${
                idx === i ? "w-5 bg-white sm:w-6" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </button>
  );
}

function LeadershipCard({
  person,
  image,
}: {
  person: (typeof ADMIN)[number];
  image?: string;
}) {

  return (
    <div className="leadership-card rounded-2xl border border-[rgb(var(--border))] p-6 text-center">
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[rgb(var(--accent-fill))] text-xl font-bold text-white">
          {person.initials}
        {image ? (
          <ImageWithFallback
            key={image}
            sources={[image]}
            alt={person.name}
            className="h-full w-full object-cover"
          />
        ) : (
          person.initials
        )}
      </div>
      <div className="mt-4 font-semibold">{person.name}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-[rgb(var(--muted))]">
        {person.role}
      </div>
    </div>
  );
}

/* ============================================================
   12. LIGHTBOX
   ============================================================ */
function Lightbox({
  item,
  onClose,
}: {
  item: (typeof GALLERY)[number];
  onClose: () => void;
}) {
  const [i, setI] = useState(0);

  const next = () => setI((v) => (v + 1) % item.images.length);
  const prev = () =>
    setI((v) => (v - 1 + item.images.length) % item.images.length);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", h);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = old;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[120] flex flex-col bg-black/95 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 px-4 py-3 text-white md:px-8">
        <div>
          <div className="text-lg font-bold">{item.title}</div>
          <div className="text-xs text-white/60">{item.description}</div>
        </div>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10"
          aria-label={PUBLIC_COPY.lightbox.close}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4 md:px-12">
        <button
          onClick={prev}
          className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 md:left-4"
          aria-label={PUBLIC_COPY.lightbox.previous}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="relative h-full w-full max-w-5xl">
          {item.images.map((src, idx) => (
            <ImageWithFallback
              key={src}
              sources={
                src.startsWith("/images/")
                  ? [...item.images.filter((image) => image.startsWith("https://"))]
                  : [src]
              }
              alt=""
              className={`absolute inset-0 m-auto max-h-full max-w-full rounded-2xl object-contain shadow-2xl transition-all duration-500 ease-out ${
                idx === i
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 md:right-4"
          aria-label={PUBLIC_COPY.lightbox.next}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 overflow-x-auto px-4 pb-6">
        {item.images.map((src, idx) => (
          <button
            key={src}
            onClick={() => setI(idx)}
            aria-label={`Show image ${idx + 1}`}
            className={`h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
              idx === i
                ? "border-white"
                : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <ImageWithFallback
              sources={
                src.startsWith("/images/")
                  ? [...item.images.filter((image) => image.startsWith("https://"))]
                  : [src]
              }
              alt=""
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   13. CONTACT SECTION
   ============================================================ */
function ContactSection() {
  const { site } = useSite();
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${
    CONTACT.lng - 0.01
  }%2C${CONTACT.lat - 0.005}%2C${CONTACT.lng + 0.01}%2C${
    CONTACT.lat + 0.005
  }&layer=mapnik&marker=${CONTACT.lat}%2C${CONTACT.lng}`;

  return (
    <section id="contact" className="bg-[rgb(var(--card))] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
            {PUBLIC_COPY.home.contact.eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">{PUBLIC_COPY.home.contact.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[rgb(var(--muted))]">
            {PUBLIC_COPY.home.contact.description}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-2xl border border-[rgb(var(--border))] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))]">
                  <IconLocation />
                </div>
                <div>
                  <div className="text-sm font-semibold">{PUBLIC_COPY.home.contact.address}</div>
                  <div className="mt-1 text-sm text-[rgb(var(--muted))]">
                    {CONTACT.addressLine}
                  </div>
                  <div className="mt-1 text-xs text-[rgb(var(--muted))]">
                    {site.location}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[rgb(var(--border))] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))]">
                  <IconPhone />
                </div>
                <div>
                  <div className="text-sm font-semibold">{PUBLIC_COPY.home.contact.phone}</div>
                  <div className="mt-1 flex flex-col text-sm text-[rgb(var(--muted))]">
                    {site.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s/g, "")}`}
                        className="hover:text-[rgb(var(--fg))]"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[rgb(var(--border))] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))]">
                  <IconMail />
                </div>
                <div>
                  <div className="text-sm font-semibold">{PUBLIC_COPY.home.contact.email}</div>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 block text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]"
                  >
                    {site.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[rgb(var(--border))] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))]">
                  <IconCalendar />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{PUBLIC_COPY.home.contact.officeHours}</div>
                  <ul className="mt-2 space-y-1 text-sm text-[rgb(var(--muted))]">
                    {CONTACT.officeHours.map((h) => (
                      <li
                        key={h.day}
                        className="flex items-center justify-between gap-4"
                      >
                        <span>{h.day}</span>
                        <span className="font-medium text-[rgb(var(--fg))]">
                          {h.hours}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))]">
            <iframe
              title={PUBLIC_COPY.home.contact.mapTitle}
              src={mapSrc}
              className="h-full min-h-[420px] w-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   14. PUBLIC SITE
   ============================================================ */
function PublicSite({ onPortalClick }: { onPortalClick: () => void }) {
  const { site } = useSite();
  const leadershipImages = useLocalImageSequence(
    "/assets/images/leadership",
    ADMIN.map((person) => person.image),
  );
  const [lightboxItem, setLightboxItem] = useState<
    (typeof GALLERY)[number] | null
  >(null);

  return (
    <div className="min-h-screen">
      <LoadingOverlay />
      <PublicHeader site={site} onPortalClick={onPortalClick} />

      <Hero />
      <OurStory />

      <section id="students-of-the-week" className="bg-[rgb(var(--bg))] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-[rgb(var(--accent))]">{PUBLIC_COPY.home.studentAwards.eyebrow}</p>
              <h2 className="mt-2 text-3xl font-bold text-[rgb(var(--fg))]">{PUBLIC_COPY.home.studentAwards.title}</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[rgb(var(--muted))]">{PUBLIC_COPY.home.studentAwards.description}</p>
          </div>
          <WeeklyAwardCards />
        </div>
      </section>

      <section id="performance" className="bg-[rgb(var(--card))] py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
              {PUBLIC_COPY.home.performance.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[rgb(var(--fg))] md:text-4xl">
              {PUBLIC_COPY.home.performance.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-[rgb(var(--muted))]">
              {PUBLIC_COPY.home.performance.description}
            </p>
          </div>
          <PerformanceStudentCards />
        </div>
      </section>

      {/* ADMINISTRATION */}
      <section id="administration" className="bg-[rgb(var(--card))] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
              {PUBLIC_COPY.home.leadership.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              {PUBLIC_COPY.home.leadership.title}
            </h2>
          </div>
          <ScrollRevealGrid className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADMIN.map((person) => (
              <LeadershipCard
                key={person.name}
                person={person}
                image={leadershipImages[ADMIN.indexOf(person)]}
              />
            ))}
          </ScrollRevealGrid>
        </div>
      </section>

      {/* GALLERY — even grid, spaced from neighboring sections */}
      <section id="gallery" className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
              {PUBLIC_COPY.home.gallery.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              {PUBLIC_COPY.home.gallery.titlePrefix} {site.name}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[rgb(var(--muted))]">
              {PUBLIC_COPY.home.gallery.description}
            </p>
          </div>

          {/* Uniform 1 / 2 / 3-column grid — every card the same size */}
          <ScrollRevealGrid className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {GALLERY.map((g, idx) => (
              <GalleryCard
                key={g.id}
                item={g}
                index={idx}
                onOpen={(images) => setLightboxItem({ ...g, images })}
              />
            ))}
          </ScrollRevealGrid>
          <div className="mt-8 text-center">
            <a href="/gallery" className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] px-5 py-2.5 text-sm font-semibold text-[rgb(var(--fg))] hover:bg-[rgb(var(--border))]/40">
              {PUBLIC_COPY.home.gallery.viewAll}
            </a>
          </div>
        </div>
      </section>

      {/* NOTICEBOARD */}
      <section id="noticeboard" className="bg-[rgb(var(--card))] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--accent))]">
              {PUBLIC_COPY.home.noticeboard.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              {PUBLIC_COPY.home.noticeboard.title}
            </h2>
          </div>
          <ScrollRevealGrid className="mt-12 grid gap-6 md:grid-cols-3">
            {NOTICES.map((n) => (
              <article
                key={n.title}
                className="card-lift flex flex-col border border-[rgb(var(--border))] p-6"
              >
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-[rgb(var(--accent))]/10 px-2.5 py-1 font-semibold text-[rgb(var(--accent))]">
                    {n.tag}
                  </span>
                  <span className="text-[rgb(var(--muted))]">{n.date}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-snug">
                  {n.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-[rgb(var(--muted))]">
                  {n.body}
                </p>
              </article>
            ))}
          </ScrollRevealGrid>
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection />

      <RecommendationsContent compact />

      {/* ADMISSION LETTER */}
      <section
        id="admission-letter"
        className="bg-[rgb(var(--brand))] py-20 text-white"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--accent-secondary))]">
              {PUBLIC_COPY.home.admissionLetter.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              {PUBLIC_COPY.home.admissionLetter.title}
            </h2>
            <p className="mt-4 text-white/70">
              {PUBLIC_COPY.home.admissionLetter.description}
            </p>
            <a
              href="/admission-letter.pdf"
              download
              className="btn-pop mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900"
            >
              <IconDownload />
              {site.admissionLetterLabel}
            </a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <div className="text-sm uppercase tracking-wider text-white/60">
              {PUBLIC_COPY.home.admissionLetter.requirements}
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {PUBLIC_COPY.home.admissionLetter.requiredDocuments.map((r) => (
                <li key={r} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[rgb(var(--accent-fill))] text-[10px] font-bold">
                    ✓
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section id="apply" className="py-20">
        <div className="mx-auto max-w-4xl rounded-3xl border-t-4 border-[rgb(var(--accent-secondary))] bg-gradient-to-br from-[#003A8C] to-[#0047AA] p-10 text-center text-white md:p-16">
          <h2 className="text-3xl font-bold md:text-4xl">
            {PUBLIC_COPY.home.apply.titlePrefix} {site.name}?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">
            {PUBLIC_COPY.home.apply.description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="/admissions/apply-now"
              className="btn-pop rounded-full bg-white px-6 py-3 text-sm font-semibold text-[rgb(var(--brand))]"
            >
              {PUBLIC_COPY.home.apply.startButton}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="btn-pop rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              {PUBLIC_COPY.home.apply.contactButton}
            </a>
          </div>
        </div>
      </section>

      <PublicFooter site={site} />

      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </div>
  );
}

/* ============================================================
   15. PORTAL LOGIN
   ============================================================ */
function PortalLogin({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: () => void;
}) {
  const { site } = useSite();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const ok = login(username.trim(), password);
      setLoading(false);
      if (ok) onSuccess();
      else setError(PORTAL_COPY.invalidCredentials);
    }, 700);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#07182B] via-[#0047AA] to-[#350D15] px-4 py-12">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#C50404]/20 blur-3xl float-up" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#0059B6]/25 blur-3xl float-up" />

      <div className="relative w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-4 inline-flex items-center gap-1 text-xs font-medium text-white/70 hover:text-white"
        >
          ← {PORTAL_COPY.backToSite}
        </button>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl float-up">
          <div className="flex flex-col items-center gap-2 text-center text-white">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(var(--accent-fill))] text-white shadow-lg">
              <IconLock />
            </div>
            <h1 className="mt-3 text-2xl font-bold">{PORTAL_COPY.title}</h1>
            <p className="text-sm text-white/60">{site.name}</p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/60">
                {PORTAL_COPY.username}
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                  <IconUser />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  placeholder={ADMIN_CREDENTIALS.username}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#7EB6F5] focus:bg-white/10 focus:ring-2 focus:ring-[#0047AA]/40"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-white/60">
                {PORTAL_COPY.password}
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                  <IconLock />
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={PORTAL_COPY.passwordPlaceholder}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-16 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#7EB6F5] focus:bg-white/10 focus:ring-2 focus:ring-[#0047AA]/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-white/60 hover:text-white"
                >
                  {showPass ? PORTAL_COPY.hidePassword : PORTAL_COPY.showPassword}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-pop relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#003A8C] to-[#0047AA] px-4 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 50 50" className="animate-spin">
                    <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="6" />
                    <circle cx="25" cy="25" r="20" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeDasharray="90 150" />
                  </svg>
                  {PORTAL_COPY.signingIn}
                </span>
              ) : (
                PORTAL_COPY.signIn
              )}
            </button>
          </form>

          <div className="mt-6 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center text-[11px] text-white/50">
            {PORTAL_COPY.defaultCredentials}{" "}
            <span className="font-mono text-white/80">{ADMIN_CREDENTIALS.username} / {ADMIN_CREDENTIALS.password}</span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   16. DASHBOARD
   ============================================================ */
type SectionKey = (typeof DASHBOARD_NAV_ITEMS)[number]["key"];

function Dashboard({ onExit }: { onExit: () => void }) {
  const { site } = useSite();
  const { user, logout } = useAuth();
  const [section, setSection] = useState<SectionKey>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sectionIcons: Record<SectionKey, () => JSX.Element> = {
    overview: IconDashboard,
    students: IconStudents,
    staff: IconStaff,
    finance: IconFinance,
    events: IconCalendarDash,
    notices: IconNotice,
    settings: IconSettings,
  };
  const menu = DASHBOARD_NAV_ITEMS.map((item) => ({ ...item, Icon: sectionIcons[item.key] }));
  const sectionLabel = menu.find((item) => item.key === section)?.label ?? section;

  const doLogout = () => {
    logout();
    onExit();
  };

  return (
    <div className="flex min-h-screen bg-[rgb(var(--bg))]">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-[rgb(var(--border))] bg-[rgb(var(--card))] transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-[rgb(var(--border))] px-4">
          <Image src={SITE.logos.header} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
          <div className="text-sm font-bold leading-tight">
            {site.name
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 3)
              .toUpperCase()}
            <div className="text-[10px] font-normal uppercase tracking-wider text-[rgb(var(--muted))]">
              {DASHBOARD_COPY.adminLabel}
            </div>
          </div>
        </div>
        <nav className="space-y-1 p-3">
          {menu.map((m) => (
            <button
              key={m.key}
              onClick={() => {
                setSection(m.key);
                setSidebarOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                section === m.key
                  ? "bg-[rgb(var(--accent-fill))] text-white shadow"
                  : "text-[rgb(var(--fg))]/70 hover:bg-[rgb(var(--border))]/50 hover:text-[rgb(var(--fg))]"
              }`}
            >
              <m.Icon />
              {m.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-[rgb(var(--border))] p-3">
          <button
            onClick={doLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-500/10"
          >
              <IconLogout /> {DASHBOARD_COPY.signOut}
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-[rgb(var(--border))] bg-[rgb(var(--card))]/90 px-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-[rgb(var(--border))] p-2 lg:hidden"
            >
              <IconMenu />
            </button>
            <div>
              <h1 className="text-base font-bold capitalize">{sectionLabel}</h1>
              <p className="text-[11px] text-[rgb(var(--muted))]">
                {DASHBOARD_COPY.breadcrumbPrefix} / {sectionLabel}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-3 py-1.5 text-xs md:flex">
              <IconSearch />
              <input
                placeholder={DASHBOARD_COPY.searchPlaceholder}
                className="w-40 bg-transparent outline-none placeholder:text-[rgb(var(--muted))]"
              />
            </div>
            <ThemeToggle />
            <div className="flex items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-2 py-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgb(var(--accent-fill))] text-xs font-bold text-white">
                {user?.username?.[0]?.toUpperCase() ?? "A"}
              </div>
              <span className="hidden text-xs font-semibold sm:inline">
                {user?.username}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">
          {section === "overview" && <Overview onJump={setSection} />}
          {section === "students" && <StudentsSection />}
          {section === "staff" && <StaffSection />}
          {section === "finance" && <FinanceSection />}
          {section === "events" && <EventsSection />}
          {section === "notices" && <NoticesSection />}
          {section === "settings" && <SettingsSection />}
        </main>
      </div>
    </div>
  );
}

/* ─── Dashboard sections ─────────────────────────────────────── */
function StatCard({
  label,
  value,
  tone,
  Icon,
}: {
  label: string;
  value: string;
  tone: string;
  Icon: () => JSX.Element;
}) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-wider text-[rgb(var(--muted))]">
          {label}
        </div>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl text-white ${tone}`}
        >
          <Icon />
        </div>
      </div>
      <div className="mt-3 text-3xl font-bold">{value}</div>
    </div>
  );
}

function Overview({ onJump }: { onJump: (s: SectionKey) => void }) {
  const paidTotal = DASHBOARD_FINANCE.filter((f) => f.status === "Paid").reduce(
    (a, b) => a + b.amount,
    0,
  );
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label={DASHBOARD_COPY.overview.students}
          value={String(DASHBOARD_STUDENTS.length)}
          tone="bg-[rgb(var(--accent-fill))]"
          Icon={IconStudents}
        />
        <StatCard
          label={DASHBOARD_COPY.overview.staff}
          value={String(DASHBOARD_STAFF.length)}
          tone="bg-gradient-to-br from-emerald-500 to-teal-600"
          Icon={IconStaff}
        />
        <StatCard
          label={DASHBOARD_COPY.overview.paidRevenue}
          value={`UGX ${paidTotal.toLocaleString()}`}
          tone="bg-gradient-to-br from-amber-500 to-orange-600"
          Icon={IconFinance}
        />
        <StatCard
          label={DASHBOARD_COPY.overview.upcomingEvents}
          value={String(DASHBOARD_EVENTS.length)}
          tone="bg-gradient-to-br from-pink-500 to-rose-600"
          Icon={IconCalendarDash}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">{DASHBOARD_COPY.overview.recentFinance}</h3>
            <button
              onClick={() => onJump("finance")}
              className="text-xs font-semibold text-[rgb(var(--accent))] hover:underline"
            >
              {DASHBOARD_COPY.overview.viewAll}
            </button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-[11px] uppercase tracking-wider text-[rgb(var(--muted))]">
                <tr>
                  <th className="py-2">{DASHBOARD_COPY.overview.invoice}</th>
                  <th className="py-2">{DASHBOARD_COPY.overview.student}</th>
                  <th className="py-2">{DASHBOARD_COPY.overview.amount}</th>
                  <th className="py-2">{DASHBOARD_COPY.overview.status}</th>
                </tr>
              </thead>
              <tbody>
                {DASHBOARD_FINANCE.slice(0, 4).map((f) => (
                  <tr key={f.id} className="border-t border-[rgb(var(--border))]">
                    <td className="py-2 font-mono text-xs">{f.id}</td>
                    <td className="py-2">{f.student}</td>
                    <td className="py-2">UGX {f.amount.toLocaleString()}</td>
                    <td className="py-2">
                      <StatusBadge status={f.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold">{DASHBOARD_COPY.overview.upcomingEvents}</h3>
            <button
              onClick={() => onJump("events")}
              className="text-xs font-semibold text-[rgb(var(--accent))] hover:underline"
            >
              {DASHBOARD_COPY.overview.all}
            </button>
          </div>
          <ul className="mt-4 space-y-3">
            {DASHBOARD_EVENTS.slice(0, 4).map((e, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-[rgb(var(--border))] p-3"
              >
                <div className="flex h-10 w-10 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))]">
                  <div className="text-[10px] font-bold uppercase leading-none">
                    {e.date.split(" ")[1]}
                  </div>
                  <div className="text-sm font-bold leading-none">
                    {e.date.split(" ")[0]}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">
                    {e.title}
                  </div>
                  <div className="text-xs text-[rgb(var(--muted))]">
                    {e.time}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Paid: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    Active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    Partial: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    Pending: "bg-red-500/10 text-red-600 dark:text-red-400",
  };
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${map[status] ?? "bg-[rgb(var(--border))] text-[rgb(var(--muted))]"}`}
    >
      {status}
    </span>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      <table className="w-full text-sm">
        <thead className="bg-[rgb(var(--bg))] text-left text-[11px] uppercase tracking-wider text-[rgb(var(--muted))]">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className="border-t border-[rgb(var(--border))] hover:bg-[rgb(var(--bg))]/60"
            >
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionHeader({
  title,
  desc,
  action,
}: {
  title: string;
  desc: string;
  action?: string;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-xs text-[rgb(var(--muted))]">{desc}</p>
      </div>
      {action && (
        <button className="btn-pop rounded-full bg-[rgb(var(--accent-fill))] px-4 py-2 text-xs font-semibold text-white">
          {action}
        </button>
      )}
    </div>
  );
}

function StudentsSection() {
  return (
    <div>
      <SectionHeader
        title={DASHBOARD_NAV_ITEMS[1].label}
        desc={DASHBOARD_COPY.students.description}
        action={DASHBOARD_COPY.students.addAction}
      />
      <DataTable
        headers={[...DASHBOARD_COPY.students.headers]}
        rows={DASHBOARD_STUDENTS.map((s) => [
          <span key={s.id} className="font-mono text-xs">
            {s.id}
          </span>,
          s.name,
          s.class,
          s.stream,
          s.guardian,
          <StatusBadge key={s.id + "-s"} status={s.status} />,
        ])}
      />
    </div>
  );
}

function StaffSection() {
  return (
    <div>
      <SectionHeader
        title={DASHBOARD_NAV_ITEMS[2].label}
        desc={DASHBOARD_COPY.staff.description}
        action={DASHBOARD_COPY.staff.addAction}
      />
      <DataTable
        headers={[...DASHBOARD_COPY.staff.headers]}
        rows={DASHBOARD_STAFF.map((s) => [
          <span key={s.id} className="font-mono text-xs">
            {s.id}
          </span>,
          s.name,
          s.role,
          s.dept,
          s.phone,
        ])}
      />
    </div>
  );
}

function FinanceSection() {
  const total = DASHBOARD_FINANCE.reduce((a, b) => a + b.amount, 0);
  const paid = DASHBOARD_FINANCE.filter((f) => f.status === "Paid").reduce(
    (a, b) => a + b.amount,
    0,
  );
  const outstanding = total - paid;
  return (
    <div className="space-y-5">
      <SectionHeader
        title={DASHBOARD_NAV_ITEMS[3].label}
        desc={DASHBOARD_COPY.finance.description}
        action={DASHBOARD_COPY.finance.addAction}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label={DASHBOARD_COPY.finance.totalBilled}
          value={`UGX ${total.toLocaleString()}`}
          tone="bg-[rgb(var(--accent-fill))]"
          Icon={IconFinance}
        />
        <StatCard
          label={DASHBOARD_COPY.finance.collected}
          value={`UGX ${paid.toLocaleString()}`}
          tone="bg-gradient-to-br from-emerald-500 to-teal-600"
          Icon={IconFinance}
        />
        <StatCard
          label={DASHBOARD_COPY.finance.outstanding}
          value={`UGX ${outstanding.toLocaleString()}`}
          tone="bg-gradient-to-br from-red-500 to-rose-600"
          Icon={IconFinance}
        />
      </div>
      <DataTable
        headers={[...DASHBOARD_COPY.finance.headers]}
        rows={DASHBOARD_FINANCE.map((f) => [
          <span key={f.id} className="font-mono text-xs">
            {f.id}
          </span>,
          f.student,
          `UGX ${f.amount.toLocaleString()}`,
          f.date,
          <StatusBadge key={f.id + "-s"} status={f.status} />,
        ])}
      />
    </div>
  );
}

function EventsSection() {
  return (
    <div>
      <SectionHeader
        title={DASHBOARD_NAV_ITEMS[4].label}
        desc={DASHBOARD_COPY.events.description}
        action={DASHBOARD_COPY.events.addAction}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {DASHBOARD_EVENTS.map((e, i) => (
          <div
            key={i}
            className="flex items-start gap-4 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5"
          >
            <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-[rgb(var(--accent))]/10 text-[rgb(var(--accent))]">
              <div className="text-[10px] font-bold uppercase">
                {e.date.split(" ")[1]}
              </div>
              <div className="text-lg font-bold leading-none">
                {e.date.split(" ")[0]}
              </div>
            </div>
            <div>
              <div className="font-semibold">{e.title}</div>
              <div className="text-xs text-[rgb(var(--muted))]">
                {e.date} • {e.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NoticesSection() {
  return (
    <div>
      <SectionHeader
        title={DASHBOARD_NAV_ITEMS[5].label}
        desc={DASHBOARD_COPY.notices.description}
        action={DASHBOARD_COPY.notices.addAction}
      />
      <div className="space-y-3">
        {NOTICES.map((n) => (
          <div
            key={n.title}
            className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5"
          >
            <div className="flex items-center gap-3 text-xs">
              <span className="rounded-full bg-[rgb(var(--accent))]/10 px-2.5 py-1 font-semibold text-[rgb(var(--accent))]">
                {n.tag}
              </span>
              <span className="text-[rgb(var(--muted))]">{n.date}</span>
            </div>
            <h3 className="mt-2 font-semibold">{n.title}</h3>
            <p className="mt-1 text-sm text-[rgb(var(--muted))]">{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsSection() {
  const { site } = useSite();
  const { theme, setTheme } = useTheme();
  return (
    <div className="max-w-2xl space-y-5">
      <SectionHeader title={DASHBOARD_NAV_ITEMS[6].label} desc={DASHBOARD_COPY.settings.description} />
      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
        <div className="text-sm font-semibold">{DASHBOARD_COPY.settings.appearance}</div>
        <p className="mt-1 text-xs text-[rgb(var(--muted))]">
          {DASHBOARD_COPY.settings.appearanceDescription}
        </p>
        <div className="mt-4 flex gap-2">
          {DASHBOARD_COPY.themeOptions.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={`rounded-full px-4 py-2 text-xs font-semibold capitalize transition ${
                theme === key
                  ? "bg-[rgb(var(--accent-fill))] text-white"
                  : "border border-[rgb(var(--border))] hover:bg-[rgb(var(--border))]/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
        <div className="text-sm font-semibold">{DASHBOARD_COPY.settings.schoolInfo}</div>
        <p className="mt-1 text-xs text-[rgb(var(--muted))]">
          {DASHBOARD_COPY.settings.constantsDescription}{" "}
          <code className="rounded bg-[rgb(var(--border))]/50 px-1">
            app/constants.ts
          </code>
          .
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[rgb(var(--muted))]">
              {DASHBOARD_COPY.settings.fields.name}
            </div>
            <div className="text-sm font-medium">{site.name}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[rgb(var(--muted))]">
              {DASHBOARD_COPY.settings.fields.unebCenter}
            </div>
            <div className="text-sm font-medium">{site.unebCenterNo}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[rgb(var(--muted))]">
              {DASHBOARD_COPY.settings.fields.email}
            </div>
            <div className="text-sm font-medium">{site.email}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[rgb(var(--muted))]">
              {DASHBOARD_COPY.settings.fields.phone}
            </div>
            <div className="text-sm font-medium">{site.phones[0]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   17. ROOT
   ============================================================ */
type View = "site" | "login" | "dashboard";

function Root() {
  const { user } = useAuth();
  const [view, setView] = useState<View>("site");

  useEffect(() => {
    if (user && view === "login") setView("dashboard");
    if (!user && view === "dashboard") setView("login");
  }, [user, view]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("portal") === "1") {
      setView(user ? "dashboard" : "login");
    }
  }, [user]);

  return (
    <>
      {view === "site" && (
        <PublicSite
          onPortalClick={() => setView(user ? "dashboard" : "login")}
        />
      )}
      {view === "login" && (
        <PortalLogin
          onBack={() => setView("site")}
          onSuccess={() => setView("dashboard")}
        />
      )}
      {view === "dashboard" && <Dashboard onExit={() => setView("site")} />}
    </>
  );
}

/* ============================================================
   18. EXPORT
   ============================================================ */
export default function Page() {
  return (
    <ThemeProvider>
      <SiteContentProvider>
        <AuthProvider>
          <Root />
        </AuthProvider>
      </SiteContentProvider>
    </ThemeProvider>
  );
}