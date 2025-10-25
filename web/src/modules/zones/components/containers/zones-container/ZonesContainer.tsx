import { PaginationControls } from "@/components/shared/pagination-controls";
import type { ZoneDto, ZonesResponseDto } from "@/modules/zones/api/types";
import { ZonesGrid } from "@/modules/zones/components/lists/zones-grid";

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
    <div className="grid gap-2">
      <PaginationControls
        currentPage={data.pagination.page}
        totalPages={data.pagination.totalPages}
        onPageChange={onPageChange || (() => {})}
      />
      <ZonesGrid zones={data.data} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}
