import { RecommendationsContent } from "../components/recommendations-content";
import { PageIntro, PublicPageFrame } from "../components/public-page-frame";
import { PUBLIC_COPY } from "../constants";

export default function RecommendationsPage() {
  return (
    <PublicPageFrame>
      <PageIntro eyebrow={PUBLIC_COPY.recommendationsPage.eyebrow} title={PUBLIC_COPY.recommendationsPage.title} description={PUBLIC_COPY.recommendationsPage.description} />
      <RecommendationsContent />
    </PublicPageFrame>
  );
}