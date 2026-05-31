import { CardActionsMenu } from "@/components/shared/card-actions/CardActionsMenu";
import type { CardAction } from "@/components/shared/card-actions/types";
import { GridTileCard } from "@/components/shared/cards";
import { cn } from "@/lib/utils";
import {
  getKonkTheme,
  KonkBanner,
} from "@/components/shared/konk-banner";
import { EntityLabel } from "@/components/shared/entity-label";
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
          className=" block text-center wrap-break-word underline-offset-4 hover:underline"
        >
          {skugr.title}
        </Link>
      </div>

      {prod ? (
        <div className="border-border/80 text-muted-foreground flex shrink-0 items-center justify-between border-t px-2 py-1.5 text-xs">
          <EntityLabel
            imageUrl={prod.imageUrl}
            title={prod.title}
            fallbackLabel={skugr.prodName}
            imageSize="sm"
          />
          <span className="text-muted-foreground flex shrink-0 items-center gap-1  text-sm tabular-nums">
            <Notebook className="size-3.5 shrink-0" aria-hidden />
            {skuCount}
          </span>
        </div>
      ) : null}
    </GridTileCard>
  );
}
