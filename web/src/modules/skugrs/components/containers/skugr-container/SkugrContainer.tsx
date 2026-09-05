import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { AirSkugrFillContainer } from "@/modules/skugrs/components/containers/air-skugr-fill-container";
import { SkugrChartsSection } from "@/modules/skugrs/components/containers/skugr-charts-section";
import { SkugrContainerView } from "@/modules/skugrs/components/containers/skugr-container/SkugrContainerView";
import { SkusBySkugrFetcher } from "@/modules/skus/components/fetchers/skus-by-skugr-fetcher";
import { useMemo } from "react";

interface SkugrContainerProps {
  skugr: SkugrPageDto;
}

export function SkugrContainer({ skugr }: SkugrContainerProps) {
  const { hasRole } = useAuth();
  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();

  const konk = useMemo(() => {
    const konks = konksQuery.data?.data ?? [];
    return konks.find((k) => k.name === skugr.konkName);
  }, [konksQuery.data, skugr.konkName]);
  const prod = useMemo(() => {
    const prods = prodsQuery.data?.data ?? [];
    return prods.find((p) => p.name === skugr.prodName);
  }, [prodsQuery.data, skugr.prodName]);

  const showAirFill =
    skugr.konkName.toLowerCase() === "air" && hasRole(RoleType.ADMIN);

  return (
    <div className="grid gap-4">
      <SkugrContainerView skugr={skugr} konk={konk} prod={prod} />
      {showAirFill ? <AirSkugrFillContainer skugr={skugr} /> : null}
      <SkugrChartsSection skugrId={skugr._id} />
      <SkusBySkugrFetcher skugrId={skugr._id} />
    </div>
  );
}
