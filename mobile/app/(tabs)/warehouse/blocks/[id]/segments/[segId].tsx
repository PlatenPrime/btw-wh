import { PageLayout } from "@/components/layout/page-layout";
import { WarehouseAdminGuard } from "@/components/guards/warehouse-admin-guard";
import { SegmentFetcher } from "@/modules/blocks/components/fetchers/segment-fetcher";
import { useLocalSearchParams } from "expo-router";

export default function SegmentScreen() {
  const { segId } = useLocalSearchParams<{ segId: string }>();

  return (
    <WarehouseAdminGuard>
      {!segId ? (
        <PageLayout title="Сегмент не знайдено">
          <></>
        </PageLayout>
      ) : (
        <PageLayout title="Сегмент">
          <SegmentFetcher segId={segId} />
        </PageLayout>
      )}
    </WarehouseAdminGuard>
  );
}

