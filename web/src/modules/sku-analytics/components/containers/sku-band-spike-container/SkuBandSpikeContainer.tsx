import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { DiscoverBandSpikePayload } from "@/modules/sku-analytics/api/types";
import { SkuBandSpikeContainerView } from "@/modules/sku-analytics/components/containers/sku-band-spike-container/SkuBandSpikeContainerView";
import type { SkuBandSpikeCorrectTarget } from "@/modules/sku-analytics/components/tables/sku-band-spike-table";
import { CorrectBandSpikeDialog } from "@/modules/skus/components/dialogs/correct-band-spike-dialog";
import { useState } from "react";

export interface SkuBandSpikeContainerProps {
  data: DiscoverBandSpikePayload;
}

export function SkuBandSpikeContainer({ data }: SkuBandSpikeContainerProps) {
  const { hasRole } = useAuth();
  const canCorrect = hasRole(RoleType.ADMIN);
  const [correctTarget, setCorrectTarget] =
    useState<SkuBandSpikeCorrectTarget | null>(null);

  return (
    <>
      <SkuBandSpikeContainerView
        data={data}
        canCorrect={canCorrect}
        onCorrect={setCorrectTarget}
      />
      {canCorrect && correctTarget ? (
        <CorrectBandSpikeDialog
          key={`${correctTarget.skuId}-${correctTarget.dateFrom}-${correctTarget.dateTo}-${correctTarget.stockMin}-${correctTarget.stockMax}`}
          skuId={correctTarget.skuId}
          skuTitle={correctTarget.title}
          open={Boolean(correctTarget)}
          onOpenChange={(open) => {
            if (!open) setCorrectTarget(null);
          }}
          initialDateFrom={correctTarget.dateFrom}
          initialDateTo={correctTarget.dateTo}
          initialStockMin={correctTarget.stockMin}
          initialStockMax={correctTarget.stockMax}
        />
      ) : null}
    </>
  );
}
