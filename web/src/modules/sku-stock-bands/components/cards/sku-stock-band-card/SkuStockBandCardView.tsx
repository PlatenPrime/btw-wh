import { CardActionsMenu } from "@/components/shared/actions/card-actions";
import type { CardAction } from "@/components/shared/actions/card-actions";
import { ListRowCard } from "@/components/shared/cards";
import { CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { typography } from "@/lib/typography";
import type { SkuStockBandDto } from "@/modules/sku-stock-bands/api/types";
import { Link } from "react-router";

const numberFormat = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 0,
});

interface SkuStockBandCardViewProps {
  band: SkuStockBandDto;
  actions: CardAction[];
}

export function SkuStockBandCardView({
  band,
  actions,
}: SkuStockBandCardViewProps) {
  return (
    <ListRowCard>
      <CardContent className="flex items-center gap-3 p-0">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <CardTitle size="sm" className="p-0">
            <Link
              to={`/sku/stock-bands/${band._id}`}
              className={cn("block hover:underline", typography.listTitleCompact)}
            >
              {band.konk.title}
            </Link>
          </CardTitle>
          <span className={typography.listSubtitle}>{band.konk.name}</span>
        </div>
        <div className="grid shrink-0 gap-0.5 text-right tabular-nums">
          <span className={typography.listTitleCompact}>
            {numberFormat.format(band.stockMin)}–
            {numberFormat.format(band.stockMax)}
          </span>
          <span className={typography.listSubtitle}>
            норма ≤ {numberFormat.format(band.normalMax)}
          </span>
        </div>
        {actions.length > 0 ? (
          <CardActionsMenu
            actions={actions}
            orientation="vertical"
            size="sm"
            align="end"
          />
        ) : null}
      </CardContent>
    </ListRowCard>
  );
}
