import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { VariantDto } from "@/modules/variants/api/types";
import { VariantDetailsCard } from "@/modules/variants/components/cards/variant-details-card";

interface VariantContainerViewProps {
  variant: VariantDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
}

export function VariantContainerView({
  variant,
  konk,
  prod,
}: VariantContainerViewProps) {
  return <VariantDetailsCard variant={variant} konk={konk} prod={prod} />;
}
