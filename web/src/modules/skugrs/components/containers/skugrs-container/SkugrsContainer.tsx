import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkugrDto, SkugrsResponseDto } from "@/modules/skugrs/api/types";
import { SkugrsContainerView } from "@/modules/skugrs/components/containers/skugrs-container/SkugrsContainerView";

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
    <SkugrsContainerView
      data={data}
      konks={konks}
      prods={prods}
      onPageChange={onPageChange}
      onEdit={onEdit}
    />
  );
}
