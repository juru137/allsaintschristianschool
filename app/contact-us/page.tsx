import { Mail, MapPin, Phone } from "lucide-react";
import { CONTACT, PUBLIC_COPY, SITE } from "../constants";
import { PageIntro, PublicPageFrame } from "../components/public-page-frame";

export default function ContactPage() {
  const mapSource = `https://www.openstreetmap.org/export/embed.html?bbox=${CONTACT.lng - 0.01}%2C${CONTACT.lat - 0.005}%2C${CONTACT.lng + 0.01}%2C${CONTACT.lat + 0.005}&layer=mapnik&marker=${CONTACT.lat}%2C${CONTACT.lng}`;

  return (
    <PublicPageFrame>
      <PageIntro eyebrow={PUBLIC_COPY.contactPage.eyebrow} title={PUBLIC_COPY.contactPage.title} description={PUBLIC_COPY.contactPage.description} />
      <section className="mx-auto grid max-w-6xl gap-9 px-5 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:py-14">
        <div className="divide-y divide-[rgb(var(--border))]">
          <div className="flex gap-4 py-5 first:pt-0">
            <MapPin className="mt-1 flex-shrink-0 text-[rgb(var(--accent))]" size={19} />
            <div><h2 className="font-semibold">{PUBLIC_COPY.contactPage.visit}</h2><p className="mt-1 text-sm leading-6 text-[rgb(var(--muted))]">{CONTACT.addressLine}<br />{SITE.location}</p></div>
          </div>
          <div className="flex gap-4 py-5">
            <Phone className="mt-1 flex-shrink-0 text-[rgb(var(--accent))]" size={19} />
            <div><h2 className="font-semibold">{PUBLIC_COPY.contactPage.call}</h2><div className="mt-1 grid gap-1 text-sm text-[rgb(var(--muted))]">{SITE.phones.map((phone) => <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-[rgb(var(--fg))]">{phone}</a>)}</div></div>
          </div>
          <div className="flex gap-4 py-5">
            <Mail className="mt-1 flex-shrink-0 text-[rgb(var(--accent))]" size={19} />
            <div><h2 className="font-semibold">{PUBLIC_COPY.contactPage.email}</h2><a href={`mailto:${SITE.email}`} className="mt-1 block text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]">{SITE.email}</a></div>
          </div>
          <div className="py-5">
            <h2 className="font-semibold">{PUBLIC_COPY.contactPage.officeHours}</h2>
            <ul className="mt-3 grid gap-2 text-sm text-[rgb(var(--muted))]">{CONTACT.officeHours.map((item) => <li key={item.day} className="flex justify-between gap-4"><span>{item.day}</span><span>{item.hours}</span></li>)}</ul>
          </div>
        </div>
        <div className="min-h-[320px] overflow-hidden rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))] sm:min-h-[440px]">
          <iframe title={PUBLIC_COPY.contactPage.mapTitle} src={mapSource} loading="lazy" className="h-full min-h-[320px] w-full sm:min-h-[440px]" />
        </div>
      </section>
    </PublicPageFrame>
  );
}