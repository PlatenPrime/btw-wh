import { PaginationControls } from "@/components/shared/pagination-controls";
import type {
  VariantsResponseDto,
  VariantDto,
} from "@/modules/variants/api/types";
import { VariantsGrid } from "@/modules/variants/components/lists/variants-grid";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";

interface VariantsContainerProps {
  data: VariantsResponseDto;
  konks: KonkDto[];
  prods: ProdDto[];
  onEdit?: (variant: VariantDto) => void;
  onDelete?: (variant: VariantDto) => void;
  onPageChange?: (page: number) => void;
}

export function VariantsContainer({
  data,
  konks,
  prods,
  onEdit,
  onDelete,
  onPageChange,
}: VariantsContainerProps) {
  return (
    <div className="grid gap-2">
      <PaginationControls
        currentPage={data.pagination.page}
        totalPages={data.pagination.totalPages}
        onPageChange={onPageChange ?? (() => {})}
      />
      <VariantsGrid
        variants={data.data}
        konks={konks}
        prods={prods}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
}

