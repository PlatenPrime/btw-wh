import { ArtsFetcher } from '@/modules/arts/components/fetchers/arts-fetcher/ArtsFetcher';
import { PageLayout } from '@/components/layout/page-layout';

export default function ArtsList() {
  return (
    <PageLayout title="Артикули">
      <ArtsFetcher />
    </PageLayout>
  );
}