import { CardActionsMenu } from "@/components/shared/actions/card-actions";
import type { CardAction } from "@/components/shared/actions/card-actions";
import { GridTileCard } from "@/components/shared/cards";
import { EntityLabel } from "@/components/shared/entities/entity-label";
import { cn } from "@/lib/utils";
import { iconSize, typography } from "@/lib/typography";
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
  const skuCount = skugr.skus?.length ?? 0;

  return (
    <GridTileCard className="relative flex h-full flex-col gap-2 overflow-hidden p-2">
      <div className="absolute top-1 right-1 z-10">
        <CardActionsMenu
          actions={actions}
          orientation="horizontal"
          size="sm"
          align="end"
        />
      </div>

      <div className="grid gap-1 px-1 pt-1 pr-8">
        <Link
          to={`/sku/skugrs/${skugr._id}`}
          className={cn(
            "block text-center wrap-break-word underline-offset-4 hover:underline",
            typography.gridTitle,
          )}
        >
          {skugr.title}
        </Link>
        <div className="flex justify-center">
          <EntityLabel
            imageUrl={konk?.imageUrl}
            title={konk?.title}
            fallbackLabel={skugr.konkName}
            imageSize="xs"
            className={typography.caption}
          />
        </div>
      </div>

      {prod ? (
        <div
          className={cn(
            "border-border/80 flex shrink-0 items-center justify-between border-t px-1 pt-1.5",
            typography.gridSubtitle,
          )}
        >
          <EntityLabel
            imageUrl={prod.imageUrl}
            title={prod.title}
            fallbackLabel={skugr.prodName}
            imageSize="sm"
          />
          <span
            className={cn(
              "flex shrink-0 items-center gap-1 tabular-nums",
              typography.body,
            )}
          >
            <Notebook className={iconSize.inline} aria-hidden />
            {skuCount}
          </span>
        </div>
      ) : null}
    </GridTileCard>
  );
}
