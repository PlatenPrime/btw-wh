import { PaginationControls } from "@/components/shared/pagination-controls";
import type { SkugrDto, SkugrsResponseDto } from "@/modules/skugrs/api/types";
import { SkugrsGrid } from "@/modules/skugrs/components/lists/skugrs-grid";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";

interface SkugrsContainerProps {
  data: SkugrsResponseDto;
  konks: KonkDto[];
  prods: ProdDto[];
  onPageChange: (page: number) => void;
  onEdit?: (skugr: SkugrDto) => void;
}

export function SkugrsContainer({
  data,
  konks,
  prods,
  onPageChange,
  onEdit,
}: SkugrsContainerProps) {
  return (
    <div className="grid gap-2">
      <PaginationControls
        currentPage={data.pagination.page}
        totalPages={data.pagination.totalPages}
        onPageChange={onPageChange}
      />
      <SkugrsGrid skugrs={data.data} konks={konks} prods={prods} onEdit={onEdit} />
    </div>
  );
}
