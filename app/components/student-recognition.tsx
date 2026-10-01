import Image from "next/image";
import { Award, Star } from "lucide-react";
import { PERFORMANCE_SPOTLIGHT, PUBLIC_COPY, SCHOOL_PREFECTS, STUDENT_AWARDS } from "../constants";
import { ScrollRevealGrid } from "./scroll-reveal-grid";

function StudentPhoto({ src, name }: { src: string; name: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-[rgb(var(--border))]">
      <Image
        src={src}
        alt={`${name} ${PUBLIC_COPY.recognition.studentPhotoAlt}`}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}

export function WeeklyAwardCards() {
  return (
    <ScrollRevealGrid className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
      {STUDENT_AWARDS.map((student, index) => (
        <article key={student.award} className="group card-lift overflow-hidden border border-[rgb(var(--border))] bg-[rgb(var(--bg))]">
          <div className="relative">
            <StudentPhoto src={student.image} name={student.name} />
            <span className="absolute left-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-amber-600 shadow-sm" aria-label={PUBLIC_COPY.recognition.weeklyAward}>
              {index === 0 ? <Star size={18} fill="currentColor" /> : <Award size={18} />}
            </span>
          </div>
          <div className="p-4">
            <p className="text-xs font-semibold uppercase text-[rgb(var(--accent))]">{student.award}</p>
            <h3 className="mt-1 font-bold text-[rgb(var(--fg))]">{student.name}</h3>
            <p className="mt-2 text-xs text-[rgb(var(--muted))]">{PUBLIC_COPY.recognition.studentOfTheWeek}</p>
          </div>
        </article>
      ))}
    </ScrollRevealGrid>
  );
}

export function PerformanceStudentCards() {
  return (
    <ScrollRevealGrid className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
      {PERFORMANCE_SPOTLIGHT.map((student) => (
        <article key={student.name} className="group card-lift overflow-hidden border border-[rgb(var(--border))] bg-[rgb(var(--bg))]">
          <StudentPhoto src={student.image} name={student.name} />
          <div className="flex items-start justify-between gap-3 p-4">
            <div className="min-w-0">
              <h3 className="font-bold text-[rgb(var(--fg))]">{student.name}</h3>
              <p className="mt-1 text-sm text-[rgb(var(--muted))]">{student.className}</p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-[rgb(var(--accent))]">{student.grade}</span>
          </div>
        </article>
      ))}
    </ScrollRevealGrid>
  );
}

export function SchoolPrefectCards() {
  return (
    <ScrollRevealGrid className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
      {SCHOOL_PREFECTS.map((student) => (
        <article key={student.role} className="group card-lift overflow-hidden border border-[rgb(var(--border))] bg-[rgb(var(--bg))]">
          <StudentPhoto src={student.image} name={student.name} />
          <div className="p-4">
            <p className="text-xs font-semibold uppercase text-[rgb(var(--accent))]">{student.role}</p>
            <h3 className="mt-1 font-bold text-[rgb(var(--fg))]">{student.name}</h3>
            <p className="mt-1 text-sm text-[rgb(var(--muted))]">{student.grade}</p>
          </div>
        </article>
      ))}
    </ScrollRevealGrid>
  );
}