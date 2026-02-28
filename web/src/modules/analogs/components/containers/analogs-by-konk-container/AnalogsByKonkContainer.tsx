import { PaginationControls } from "@/components/shared/pagination-controls";
import type { AnalogsResponseDto } from "@/modules/analogs/api/types";
import { AnalogsGrid } from "@/modules/analogs/components/lists/analogs-grid";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";

interface AnalogsByKonkContainerProps {
  data: AnalogsResponseDto;
  konks: KonkDto[];
  prods: ProdDto[];
  onPageChange: (page: number) => void;
}

export function AnalogsByKonkContainer({
  data,
  konks,
  prods,
  onPageChange,
}: AnalogsByKonkContainerProps) {
  return (
    <div className="grid gap-2">
      <PaginationControls
        currentPage={data.pagination.page}
        totalPages={data.pagination.totalPages}
        onPageChange={onPageChange}
      />
      <AnalogsGrid analogs={data.data} konks={konks} prods={prods} />
    </div>
  );
}
