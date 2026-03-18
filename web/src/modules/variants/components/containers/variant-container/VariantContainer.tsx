import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { VariantDto } from "@/modules/variants/api/types";
import { VariantDetailsCard } from "@/modules/variants/components/cards/variant-details-card";
import { VariantDetailHeaderActions } from "@/modules/variants/components/actions/variant-detail-header-actions/VariantDetailHeaderActions";
import { useMemo } from "react";

interface VariantContainerProps {
  variant: VariantDto;
  konks: KonkDto[];
  prods: ProdDto[];
}

export function VariantContainer({ variant, konks, prods }: VariantContainerProps) {
  const konk = useMemo(
    () => konks.find((k) => k.name === variant.konkName),
    [konks, variant.konkName],
  );

  const prod = useMemo(
    () => prods.find((p) => p.name === variant.prodName),
    [prods, variant.prodName],
  );

  return (
    <>
      <VariantDetailHeaderActions variant={variant} />
      <VariantDetailsCard variant={variant} konk={konk} prod={prod} />
    </>
  );
}

