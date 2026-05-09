import { PageLayout } from "@/components/layout/page-layout";
import { WarehouseAdminGuard } from "@/components/guards/warehouse-admin-guard";
import { BlocksFetcher } from "@/modules/blocks/components/fetchers/blocks-fetcher";

export default function BlocksScreen() {
  return (
    <WarehouseAdminGuard>
      <PageLayout title="Блоки">
        <BlocksFetcher />
      </PageLayout>
    </WarehouseAdminGuard>
  );
}
