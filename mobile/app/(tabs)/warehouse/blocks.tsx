import { PageLayout } from "@/components/layout/page-layout";
import { BlocksFetcher } from "@/modules/blocks/components/fetchers/blocks-fetcher";

export default function BlocksScreen() {
  return (
    <PageLayout title="Блоки">
      <BlocksFetcher />
    </PageLayout>
  );
}
