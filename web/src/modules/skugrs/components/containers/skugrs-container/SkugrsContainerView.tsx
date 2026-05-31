import { PaginationControls } from "@/components/shared/pagination-controls";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkugrDto, SkugrsResponseDto } from "@/modules/skugrs/api/types";
import { SkugrsGrid } from "@/modules/skugrs/components/lists/skugrs-grid";

interface SkugrsContainerViewProps {
  data: SkugrsResponseDto;
  konks: KonkDto[];
  prods: ProdDto[];
  onPageChange: (page: number) => void;
  onEdit?: (skugr: SkugrDto) => void;
}

export function SkugrsContainerView({
  data,
  konks,
  prods,
  onPageChange,
  onEdit,
}: SkugrsContainerViewProps) {
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
