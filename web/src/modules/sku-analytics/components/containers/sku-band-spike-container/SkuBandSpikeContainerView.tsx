import { SurfaceSection } from "@/components/shared/layout";
import type { DiscoverBandSpikePayload } from "@/modules/sku-analytics/api/types";
import {
  SkuBandSpikeTable,
  type SkuBandSpikeCorrectTarget,
} from "@/modules/sku-analytics/components/tables/sku-band-spike-table";

export interface SkuBandSpikeContainerViewProps {
  data: DiscoverBandSpikePayload;
  canCorrect: boolean;
  onCorrect: (target: SkuBandSpikeCorrectTarget) => void;
}

export function SkuBandSpikeContainerView({
  data,
  canCorrect,
  onCorrect,
}: SkuBandSpikeContainerViewProps) {
  return (
    <SurfaceSection className="grid gap-3 p-0">
      <div className="flex flex-wrap items-baseline gap-2 px-3 pt-3 text-sm text-muted-foreground">
        <span className="text-foreground font-medium">
          Кандидати · {data.items.length}
        </span>
        <span>
          {data.konkName} · band {data.band.min}–{data.band.max}
        </span>
        <span>
          {data.window.dateFrom.slice(0, 10)}–{data.window.dateTo.slice(0, 10)}
        </span>
      </div>
      <SkuBandSpikeTable
        items={data.items}
        stockMin={data.band.min}
        stockMax={data.band.max}
        canCorrect={canCorrect}
        onCorrect={onCorrect}
      />
    </SurfaceSection>
  );
}
