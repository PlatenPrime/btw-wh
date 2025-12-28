import { ZonesFetcher } from '@/modules/zones/components/fetchers/zones-fetcher/ZonesFetcher';
import { PageLayout } from '@/components/layout/page-layout';

export default function ZonesScreen() {
  return (
    <PageLayout title="Зони">
      <ZonesFetcher />
    </PageLayout>
  );
}