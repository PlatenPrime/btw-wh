import type { ZoneWithSegmentDto } from "@/modules/blocks/api/types";
import { ZonesBySegmentListView } from "./ZonesBySegmentListView";

interface ZonesBySegmentListProps {
  zones: ZoneWithSegmentDto[] | undefined;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ZonesBySegmentList({
  zones,
  refreshing,
  onRefresh,
}: ZonesBySegmentListProps) {
  return (
    <ZonesBySegmentListView
      zones={zones}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

