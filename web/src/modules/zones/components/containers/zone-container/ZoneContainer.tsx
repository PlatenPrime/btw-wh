import type { ZoneDto } from "@/modules/zones/api/types";
import { ZoneDetailHeaderActions } from "@/modules/zones/components/actions/zone-detail-header-actions";
import { ZoneContainerView } from "@/modules/zones/components/containers/zone-container/ZoneContainerView";

interface ZoneContainerProps {
  zone: ZoneDto;
}

export function ZoneContainer({ zone }: ZoneContainerProps) {
  return (
    <>
      <ZoneDetailHeaderActions zone={zone} />
      <ZoneContainerView zone={zone} />
    </>
  );
}
