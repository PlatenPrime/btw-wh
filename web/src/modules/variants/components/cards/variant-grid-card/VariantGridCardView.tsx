import { CardActionsMenu } from "@/components/shared/actions/card-actions";
import { Image } from "@/components/shared/media/image/Image";
import type { CardAction } from "@/components/shared/actions/card-actions";
import { GridTileCard } from "@/components/shared/cards";
import { cn } from "@/lib/utils";
import { iconSize, typography } from "@/lib/typography";
import { Link } from "react-router";
import type { VariantDto } from "@/modules/variants/api/types";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import { EntityLabel } from "@/components/shared/entities/entity-label";

interface VariantGridCardViewProps {
  variant: VariantDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
  actions: CardAction[];
}

export function VariantGridCardView({
  variant,
  konk,
  prod,
  actions,
}: VariantGridCardViewProps) {
  return (
    <GridTileCard className="relative flex flex-col gap-2 overflow-hidden p-2">
      <div className="absolute top-1 right-1 z-10">
        <CardActionsMenu
          actions={actions}
          orientation="horizontal"
          size="sm"
          align="end"
        />
      </div>

      <Link
        to={`/analogs/variants/${variant._id}`}
        className="flex min-w-0 items-start gap-2 pr-8 hover:underline"
      >
        <Image
          src={variant.imageUrl}
          alt={variant.title}
          className={cn(
            iconSize.avatarGrid,
            "rounded-lg border bg-muted object-cover",
          )}
        />

        <div className="grid min-w-0 flex-1 gap-1">
          <div className={cn("line-clamp-1", typography.gridTitle)}>
            {variant.title}
          </div>
          <EntityLabel
            imageUrl={konk?.imageUrl}
            title={konk?.title}
            fallbackLabel={variant.konkName}
            imageSize="xs"
            className={typography.caption}
          />
          <div className={cn("line-clamp-2", typography.gridSubtitle)}>
            {variant.url}
          </div>
        </div>
      </Link>

      <div className={cn("border-border/80 border-t pt-1.5", typography.gridSubtitle)}>
        <EntityLabel
          imageUrl={prod?.imageUrl}
          title={prod?.title}
          fallbackLabel={variant.prodName}
          imageSize="sm"
        />
      </div>
    </GridTileCard>
  );
}
