import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkuDto } from "@/modules/skus/api/types";
import { useMemo } from "react";
import { SkuGridCardView } from "./SkuGridCardView";

interface SkuGridCardProps {
  sku: SkuDto;
  konk: KonkDto | undefined;
  prods: ProdDto[];
}

export function SkuGridCard({ sku, konk, prods }: SkuGridCardProps) {
  const prod = useMemo(
    () => prods.find((p) => p.name === sku.prodName),
    [prods, sku.prodName],
  );

  return <SkuGridCardView sku={sku} konk={konk} prod={prod} />;
}
