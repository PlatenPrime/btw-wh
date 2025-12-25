import { AsksFetcher } from "@/modules/asks/components/fetchers/asks-fetcher/AsksFetcher";
import { PageLayout } from '@/components/layout/page-layout';

export default function AsksScreen() {
  return (
    <PageLayout title="Запити">
      <AsksFetcher />
    </PageLayout>
  );
}