import type { SkugrDto } from "@/modules/skugrs/api/types";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import { useMemo } from "react";
import { SkugrGridCardView } from "./SkugrGridCardView";

interface SkugrGridCardProps {
  skugr: SkugrDto;
  konks: KonkDto[];
  prods: ProdDto[];
}

export function SkugrGridCard({ skugr, konks, prods }: SkugrGridCardProps) {
  const konk = useMemo(
    () => konks.find((k) => k.name === skugr.konkName),
    [konks, skugr.konkName],
  );
  const prod = useMemo(
    () => prods.find((p) => p.name === skugr.prodName),
    [prods, skugr.prodName],
  );

  return <SkugrGridCardView skugr={skugr} konk={konk} prod={prod} />;
}
