import { PageLayout } from "@/components/layout/page-layout";
import { SegmentFetcher } from "@/modules/blocks/components/fetchers/segment-fetcher";
import { useLocalSearchParams } from "expo-router";

export default function SegmentScreen() {
  const { segId } = useLocalSearchParams<{ segId: string }>();

  if (!segId) {
    return (
      <PageLayout title="Сегмент не знайдено">
        <></>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Сегмент">
      <SegmentFetcher segId={segId} />
    </PageLayout>
  );
}

