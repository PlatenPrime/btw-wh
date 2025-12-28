import type { ZoneDto } from "@/modules/zones/api/types/dto";
import { ZonesListView } from "./ZonesListView";

interface ZonesListProps {
  zones: ZoneDto[] | undefined;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ZonesList({
  zones,
  refreshing,
  onRefresh,
}: ZonesListProps) {
  return (
    <ZonesListView zones={zones} refreshing={refreshing} onRefresh={onRefresh} />
  );
}

