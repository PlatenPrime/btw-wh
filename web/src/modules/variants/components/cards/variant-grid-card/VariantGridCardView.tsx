import { CardActionsMenu } from "@/components/shared/actions/card-actions";
import { Image } from "@/components/shared/media/image/Image";
import type { CardAction } from "@/components/shared/actions/card-actions";
import { GridTileCard } from "@/components/shared/cards";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import type { VariantDto } from "@/modules/variants/api/types";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import {
  getKonkTheme,
  KonkBanner,
} from "@/components/shared/domain/konk-banner";
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
  const theme = getKonkTheme(variant.konkName);

  return (
    <GridTileCard
      className={cn("flex flex-col gap-2 overflow-hidden p-0", theme.shadow)}
    >
      <KonkBanner
        konkName={variant.konkName}
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

      <div className="flex flex-col items-center gap-2 px-2">
        <Link
          to={`/analogs/variants/${variant._id}`}
          className="flex min-w-0 items-start justify-center gap-2 hover:underline"
        >
          <Image
            src={variant.imageUrl}
            alt={variant.title}
            className="size-14 shrink-0 rounded-lg border bg-muted object-cover"
          />

          <div className="min-w-0">
            <div className="text-sm font-semibold line-clamp-1">
              {variant.title}
            </div>
            <div className="text-muted-foreground line-clamp-2 text-xs">
              {variant.url}
            </div>
          </div>
        </Link>
      </div>

      <div className="text-muted-foreground flex justify-center pb-2 text-xs">
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

