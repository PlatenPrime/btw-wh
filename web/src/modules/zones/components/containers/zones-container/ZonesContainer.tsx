import { PaginationControls } from "@/components/shared/pagination-controls";
import type { ZonesResponseDto } from "@/modules/zones/api/types";
import { ZonesGrid } from "@/modules/zones/components/lists/zones-grid";

interface ZonesContainerProps {
  data: ZonesResponseDto;
  onEdit?: (zone: any) => void;
  onDelete?: (zone: any) => void;
  onPageChange?: (page: number) => void;
}

export function ZonesContainer({
  data,
  onEdit,
  onDelete,
  onPageChange,
}: ZonesContainerProps) {
  return (
    <div className="space-y-4">
      <ZonesGrid zones={data.data} onEdit={onEdit} onDelete={onDelete} />
      <PaginationControls
        currentPage={data.pagination.page}
        totalPages={data.pagination.totalPages}
        onPageChange={onPageChange || (() => {})}
      />
    </div>
  );
}
