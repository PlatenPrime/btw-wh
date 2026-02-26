import { PaginationControls } from "@/components/shared/pagination-controls";
import type {
  AnalogDto,
  AnalogsResponseDto,
} from "@/modules/analogs/api/types";
import { AnalogsGrid } from "@/modules/analogs/components/lists/analogs-grid";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";

interface AnalogsContainerProps {
  data: AnalogsResponseDto;
  konks: KonkDto[];
  prods: ProdDto[];
  onEdit?: (analog: AnalogDto) => void;
  onDelete?: (analog: AnalogDto) => void;
  onPageChange?: (page: number) => void;
}

export function AnalogsContainer({
  data,
  konks,
  prods,
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
        konks={konks}
        prods={prods}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}
