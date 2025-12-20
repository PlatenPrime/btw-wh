import { RowsFetcher } from '@/modules/rows/components/fetchers/rows-fetcher/RowsFetcher';
import { PageLayout } from '@/components/layout/page-layout';

export default function RowsScreen() {
  return (
    <PageLayout title="Ряди">
      <RowsFetcher />
    </PageLayout>
  );
}
