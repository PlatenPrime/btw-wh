import { DetailPanelCard } from "@/components/shared/cards";
import { CardContent, CardTitle } from "@/components/ui/card";
import { typography } from "@/lib/typography";
import type { SkuStockBandDto } from "@/modules/sku-stock-bands/api/types";

const numberFormat = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 0,
});

interface SkuStockBandDetailsCardViewProps {
  band: SkuStockBandDto;
}

export function SkuStockBandDetailsCardView({
  band,
}: SkuStockBandDetailsCardViewProps) {
  return (
    <DetailPanelCard>
      <CardContent className="grid gap-3 p-0">
        <div className="grid gap-1">
          <CardTitle className={`${typography.detailTitle} p-0`}>
            {band.konk.title}
          </CardTitle>
          <span className={typography.detailSubtitle}>{band.konk.name}</span>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="grid gap-0.5">
            <span className={typography.listSubtitle}>Мін. смуги</span>
            <span className={`${typography.listTitleCompact} tabular-nums`}>
              {numberFormat.format(band.stockMin)}
            </span>
          </div>
          <div className="grid gap-0.5">
            <span className={typography.listSubtitle}>Макс. смуги</span>
            <span className={`${typography.listTitleCompact} tabular-nums`}>
              {numberFormat.format(band.stockMax)}
            </span>
          </div>
          <div className="grid gap-0.5">
            <span className={typography.listSubtitle}>Норма (макс.)</span>
            <span className={`${typography.listTitleCompact} tabular-nums`}>
              {numberFormat.format(band.normalMax)}
            </span>
          </div>
        </div>
      </CardContent>
    </DetailPanelCard>
  );
}
