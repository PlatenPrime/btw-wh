import type { SegmentDto } from "@/modules/blocks/api/types";
import { SegmentsListView } from "./SegmentsListView";
import type { ReactNode } from "react";

interface SegmentsListProps {
  segments: SegmentDto[] | undefined;
  blockId: string;
  refreshing?: boolean;
  onRefresh?: () => void;
  headerComponent?: ReactNode;
}

export function SegmentsList({
  segments,
  blockId,
  refreshing,
  onRefresh,
  headerComponent,
}: SegmentsListProps) {
  return (
    <SegmentsListView
      segments={segments}
      blockId={blockId}
      refreshing={refreshing}
      onRefresh={onRefresh}
      headerComponent={headerComponent}
    />
  );
}

