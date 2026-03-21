import { PaginationControls } from "@/components/shared/pagination-controls";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkusResponseDto } from "@/modules/skus/api/types";
import { SkusGrid } from "@/modules/skus/components/lists/skus-grid";

interface SkusByKonkContainerProps {
  data: SkusResponseDto;
  konk: KonkDto | undefined;
  prods: ProdDto[];
  onPageChange: (page: number) => void;
}

export function SkusByKonkContainer({
  data,
  konk,
  prods,
  onPageChange,
}: SkusByKonkContainerProps) {
  return (
    <div className="grid gap-2">
      <PaginationControls
        currentPage={data.pagination.page}
        totalPages={data.pagination.totalPages}
        onPageChange={onPageChange}
      />
      <SkusGrid skus={data.data} konk={konk} prods={prods} />
    </div>
  );
}
