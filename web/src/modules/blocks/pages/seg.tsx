import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { useSegmentQuery } from "@/modules/blocks/api/hooks/queries/useSegmentQuery";
import {
  SegmentContainer,
  SegmentContainerSkeleton,
} from "@/modules/blocks/components/containers/segment-container";
import { SegmentFetcher } from "@/modules/blocks/components/fetchers/segment-fetcher";
import { useParams } from "react-router";

export function SegPage() {
  const { blockId, segId } = useParams<{ blockId: string; segId: string }>();
  const segmentQuery = useSegmentQuery({
    id: segId ?? "",
    enabled: !!segId,
  });
  const segmentData = segmentQuery.data;

  if (!blockId || !segId) {
    return (
      <SidebarInsetLayout headerText="Сегмент не знайдено">
        <main className="p-4">
          <div className="text-muted-foreground text-center">
            ID блоку або сегмента не вказано
          </div>
        </main>
      </SidebarInsetLayout>
    );
  }

  const headerText = segmentData?.data
    ? `Сегмент #${segmentData.data.order} блоку ${segmentData.data.blockData.title}`
    : "Сегмент";

  return (
    <SidebarInsetLayout headerText={headerText}>
      <main className="p-2">
        <SegmentFetcher
          segId={segId}
          ContainerComponent={SegmentContainer}
          SkeletonComponent={SegmentContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
