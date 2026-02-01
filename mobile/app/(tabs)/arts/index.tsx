import { PageLayout } from "@/components/layout/page-layout";
import { ArtsFetcher } from "@/modules/arts/components/fetchers/arts-fetcher/ArtsFetcher";

export default function ArtsList() {
  return (
    <PageLayout title="Артикули" useHeroGradient>
      <ArtsFetcher />
    </PageLayout>
  );
}