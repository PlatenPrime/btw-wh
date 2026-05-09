import { PageLayout } from "@/components/layout/page-layout";
import { WarehouseAdminGuard } from "@/components/guards/warehouse-admin-guard";
import { BlockFetcher } from "@/modules/blocks/components/fetchers/block-fetcher";
import { useLocalSearchParams } from "expo-router";

export default function BlockScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <WarehouseAdminGuard>
      {!id ? (
        <PageLayout title="Блок не знайдено">
          <></>
        </PageLayout>
      ) : (
        <PageLayout title="Блок">
          <BlockFetcher blockId={id} />
        </PageLayout>
      )}
    </WarehouseAdminGuard>
  );
}

