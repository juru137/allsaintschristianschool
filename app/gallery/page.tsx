import { PageIntro, PublicPageFrame } from "../components/public-page-frame";
import { GalleryGrid } from "../components/gallery-grid";
import { PUBLIC_COPY } from "../constants";

export default function GalleryPage() {
  return (
    <PublicPageFrame>
      <PageIntro
        eyebrow={PUBLIC_COPY.galleryPage.eyebrow}
        title={PUBLIC_COPY.galleryPage.title}
        description={PUBLIC_COPY.galleryPage.description}
      />
      <section className="mx-auto max-w-6xl px-5 py-9 sm:py-12">
        <GalleryGrid />
      </section>
    </PublicPageFrame>
  );
}