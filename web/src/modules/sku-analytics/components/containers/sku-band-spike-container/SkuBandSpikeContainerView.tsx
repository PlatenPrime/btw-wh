import { SurfaceSection } from "@/components/shared/layout";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
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

const numberFormat = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 0,
});

export function SkuBandSpikeContainerView({
  data,
  canCorrect,
  onCorrect,
}: SkuBandSpikeContainerViewProps) {
  return (
    <SurfaceSection className="grid gap-3 p-0">
      <h2
        className={cn(
          typography.sectionTitle,
          "flex items-baseline gap-2 px-3 pt-3 tabular-nums",
        )}
      >
        {numberFormat.format(data.items.length)} артикулів
      </h2>
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
