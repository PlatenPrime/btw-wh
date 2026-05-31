import type {
  VariantsResponseDto,
  VariantDto,
} from "@/modules/variants/api/types";
import { VariantsContainerView } from "@/modules/variants/components/containers/variants-container/VariantsContainerView";
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
    <VariantsContainerView
      data={data}
      konks={konks}
      prods={prods}
      onEdit={onEdit}
      onDelete={onDelete}
      onPageChange={onPageChange}
    />
  );
}
