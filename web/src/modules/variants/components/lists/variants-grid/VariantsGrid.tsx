import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { VariantDto } from "@/modules/variants/api/types";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import { VariantGridCard } from "@/modules/variants/components/cards/variant-grid-card";

interface VariantsGridProps {
  variants: VariantDto[];
  konks: KonkDto[];
  prods: ProdDto[];
  onEdit?: (variant: VariantDto) => void;
  onDelete?: (variant: VariantDto) => void;
}

export function VariantsGrid({
  variants,
  konks,
  prods,
  onEdit,
  onDelete,
}: VariantsGridProps) {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {variants.map((variant) => (
        <VariantGridCard
          key={variant._id}
          variant={variant}
          konks={konks}
          prods={prods}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </Wrapper>
  );
}

