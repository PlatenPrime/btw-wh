import type { ZoneDto } from "@/modules/zones/api/types/dto";
import { ZoneDetailHeaderActions } from "@/modules/zones/components/actions/zone-detail-header-actions";
import { ZoneContainerView } from "@/modules/zones/components/containers/zone-container/ZoneContainerView";

interface ZoneContainerProps {
  zone: ZoneDto;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ZoneContainer({
  zone,
  refreshing,
  onRefresh,
}: ZoneContainerProps) {
  return (
    <>
      <ZoneDetailHeaderActions zone={zone} />
      <ZoneContainerView zone={zone} refreshing={refreshing} onRefresh={onRefresh} />
    </>
  );
}

