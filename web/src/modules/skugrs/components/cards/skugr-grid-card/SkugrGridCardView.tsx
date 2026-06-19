import { CardActionsMenu } from "@/components/shared/actions/card-actions";
import type { CardAction } from "@/components/shared/actions/card-actions";
import { GridTileCard } from "@/components/shared/cards";
import { cn } from "@/lib/utils";
import { iconSize, typography } from "@/lib/typography";
import {
  getKonkTheme,
  KonkBanner,
} from "@/components/shared/domain/konk-banner";
import { EntityLabel } from "@/components/shared/entities/entity-label";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkugrDto } from "@/modules/skugrs/api/types";
import { Notebook } from "lucide-react";
import { Link } from "react-router";

interface SkugrGridCardViewProps {
  skugr: SkugrDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
  actions: CardAction[];
}

export function SkugrGridCardView({
  skugr,
  konk,
  prod,
  actions,
}: SkugrGridCardViewProps) {
  const theme = getKonkTheme(skugr.konkName);
  const skuCount = skugr.skus?.length ?? 0;

  return (
    <GridTileCard
      className={cn(
        "flex h-full flex-col gap-0 overflow-hidden p-0",
        theme.shadow,
      )}
    >
      <KonkBanner
        konkName={skugr.konkName}
        imageUrl={konk?.imageUrl}
        title={konk?.title}
        actionSlot={
          <CardActionsMenu
            actions={actions}
            orientation="horizontal"
            size="sm"
            align="end"
          />
        }
      />

      <div className="flex justify-center py-2">
        <Link
          to={`/sku/skugrs/${skugr._id}`}
          className={cn("block text-center wrap-break-word underline-offset-4 hover:underline", typography.gridTitle)}
        >
          {skugr.title}
        </Link>
      </div>

      {prod ? (
        <div className={cn("border-border/80 flex shrink-0 items-center justify-between border-t px-2 py-1.5", typography.gridSubtitle)}>
          <EntityLabel
            imageUrl={prod.imageUrl}
            title={prod.title}
            fallbackLabel={skugr.prodName}
            imageSize="sm"
          />
          <span className={cn("flex shrink-0 items-center gap-1 tabular-nums", typography.body)}>
            <Notebook className={iconSize.inline} aria-hidden />
            {skuCount}
          </span>
        </div>
      ) : null}
    </GridTileCard>
  );
}
