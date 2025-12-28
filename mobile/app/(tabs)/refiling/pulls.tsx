import { PageLayout } from "@/components/layout/page-layout";
import { PullsFetcher } from "@/modules/asks/components/fetchers/pulls-fetcher/PullsFetcher";

export default function PullsScreen() {
  return (
    <PageLayout title="Зняття">
      <PullsFetcher />
    </PageLayout>
  );
}
