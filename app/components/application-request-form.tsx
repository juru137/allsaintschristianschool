"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { PUBLIC_COPY, SITE } from "../constants";

const inputClassName = "mt-1.5 w-full rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--bg))] px-3 py-2.5 text-sm text-[rgb(var(--fg))] outline-none focus:border-[rgb(var(--accent))]";

export function ApplicationRequestForm() {
  const [emailReady, setEmailReady] = useState(false);
  const copy = PUBLIC_COPY.applicationForm;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const body = [
      `${copy.emailBodyLabels.studentName}: ${fields.get("studentName")}`,
      `${copy.emailBodyLabels.dateOfBirth}: ${fields.get("dateOfBirth")}`,
      `${copy.emailBodyLabels.grade}: ${fields.get("grade")}`,
      `${copy.emailBodyLabels.guardianName}: ${fields.get("guardianName")}`,
      `${copy.emailBodyLabels.email}: ${fields.get("email")}`,
      `${copy.emailBodyLabels.phone}: ${fields.get("phone")}`,
      `${copy.emailBodyLabels.message}: ${fields.get("message") || copy.emailBodyLabels.noMessage}`,
    ].join("\n");
    const subject = `${copy.emailSubject} ${fields.get("studentName")}`;

    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setEmailReady(true);
  };

  return (
    <form onSubmit={handleSubmit} className="border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 sm:p-7">
      <div className="mb-6 border-b border-[rgb(var(--border))] pb-4">
        <p className="text-xs font-semibold uppercase text-[rgb(var(--accent))]">{copy.eyebrow}</p>
        <h2 className="mt-1 text-xl font-bold text-[rgb(var(--fg))]">{copy.title}</h2>
        <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted))]">{copy.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-[rgb(var(--fg))]">{copy.fields.studentName}<input className={inputClassName} name="studentName" autoComplete="name" required /></label>
        <label className="text-sm font-medium text-[rgb(var(--fg))]">{copy.fields.dateOfBirth}<input className={inputClassName} name="dateOfBirth" type="date" required /></label>
        <label className="text-sm font-medium text-[rgb(var(--fg))]">{copy.fields.grade}<select className={inputClassName} name="grade" defaultValue="" required><option value="" disabled>{copy.fields.selectGrade}</option>{copy.grades.map((grade) => <option key={grade}>{grade}</option>)}</select></label>
        <label className="text-sm font-medium text-[rgb(var(--fg))]">{copy.fields.guardianName}<input className={inputClassName} name="guardianName" autoComplete="name" required /></label>
        <label className="text-sm font-medium text-[rgb(var(--fg))]">{copy.fields.email}<input className={inputClassName} name="email" type="email" autoComplete="email" required /></label>
        <label className="text-sm font-medium text-[rgb(var(--fg))]">{copy.fields.phone}<input className={inputClassName} name="phone" type="tel" autoComplete="tel" required /></label>
        <label className="text-sm font-medium text-[rgb(var(--fg))] sm:col-span-2">{copy.fields.message}<textarea className={inputClassName} name="message" rows={3} /></label>
      </div>

      <button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-md bg-[rgb(var(--accent-fill))] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110">
        {copy.submit} <ArrowRight size={16} />
      </button>
      {emailReady && <p role="status" className="mt-3 text-sm leading-6 text-[rgb(var(--muted))]">{copy.submitted}</p>}
    </form>
  );
}