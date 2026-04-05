import { PaginationControls } from "@/components/shared/pagination-controls";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkusResponseDto } from "@/modules/skus/api/types";
import { SkusGrid } from "@/modules/skus/components/lists/skus-grid";

interface CompetitorSkusContainerProps {
  data: SkusResponseDto;
  konks: KonkDto[];
  prods: ProdDto[];
  onPageChange: (page: number) => void;
}

export function CompetitorSkusContainer({
  data,
  konks,
  prods,
  onPageChange,
}: CompetitorSkusContainerProps) {
  return (
    <div className="grid gap-2">
      <PaginationControls
        currentPage={data.pagination.page}
        totalPages={data.pagination.totalPages}
        onPageChange={onPageChange}
      />
      <SkusGrid skus={data.data} konks={konks} prods={prods} />
    </div>
  );
}
