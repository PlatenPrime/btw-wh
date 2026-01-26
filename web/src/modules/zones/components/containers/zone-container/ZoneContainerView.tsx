import type { ZoneDto } from "@/modules/zones/api/types";
import { ZoneDetailsCard } from "@/modules/zones/components/cards/zone-details-card";

interface ZoneContainerViewProps {
  zone: ZoneDto;
}

export function ZoneContainerView({ zone }: ZoneContainerViewProps) {
  return (
    <div className="grid gap-2">
      <ZoneDetailsCard zone={zone} />
    </div>
  );
}
