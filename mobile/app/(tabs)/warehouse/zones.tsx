import { PageLayout } from "@/components/layout/page-layout";
import { WarehouseAdminGuard } from "@/components/guards/warehouse-admin-guard";
import { ZonesFetcher } from "@/modules/zones/components/fetchers/zones-fetcher/ZonesFetcher";

export default function ZonesScreen() {
  return (
    <WarehouseAdminGuard>
      <PageLayout title="Зони">
        <ZonesFetcher />
      </PageLayout>
    </WarehouseAdminGuard>
  );
}