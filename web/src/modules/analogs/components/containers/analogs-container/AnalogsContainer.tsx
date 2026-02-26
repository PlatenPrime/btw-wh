import { PaginationControls } from "@/components/shared/pagination-controls";
import type {
  AnalogDto,
  AnalogsResponseDto,
} from "@/modules/analogs/api/types";
import { AnalogsGrid } from "@/modules/analogs/components/lists/analogs-grid";

interface AnalogsContainerProps {
  data: AnalogsResponseDto;
  onEdit?: (analog: AnalogDto) => void;
  onDelete?: (analog: AnalogDto) => void;
  onPageChange?: (page: number) => void;
}

export function AnalogsContainer({
  data,
  onEdit,
  onDelete,
  onPageChange,
}: AnalogsContainerProps) {
  return (
    <div className="grid gap-2">
      <PaginationControls
        currentPage={data.pagination.page}
        totalPages={data.pagination.totalPages}
        onPageChange={onPageChange ?? (() => {})}
      />
      <AnalogsGrid
        analogs={data.data}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}
