import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { SkugrContainerView } from "@/modules/skugrs/components/containers/skugr-container/SkugrContainerView";
import { useMemo } from "react";

interface SkugrContainerProps {
  skugr: SkugrPageDto;
}

export function SkugrContainer({ skugr }: SkugrContainerProps) {
  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();
  const konks = konksQuery.data?.data ?? [];
  const prods = prodsQuery.data?.data ?? [];

  const konk = useMemo(
    () => konks.find((k) => k.name === skugr.konkName),
    [konks, skugr.konkName],
  );
  const prod = useMemo(
    () => prods.find((p) => p.name === skugr.prodName),
    [prods, skugr.prodName],
  );

  return (
    <SkugrContainerView skugr={skugr} konk={konk} prod={prod} prods={prods} />
  );
}
