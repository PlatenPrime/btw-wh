import type { ZoneDto, ZonesResponseDto } from "@/modules/zones/api/types";
import { ZonesContainerView } from "@/modules/zones/components/containers/zones-container/ZonesContainerView";

interface ZonesContainerProps {
  data: ZonesResponseDto;
  onEdit?: (zone: ZoneDto) => void;
  onDelete?: (zone: ZoneDto) => void;
  onPageChange?: (page: number) => void;
}

export function ZonesContainer({
  data,
  onEdit,
  onDelete,
  onPageChange,
}: ZonesContainerProps) {
  return (
    <ZonesContainerView
      data={data}
      onEdit={onEdit}
      onDelete={onDelete}
      onPageChange={onPageChange}
    />
  );
}
