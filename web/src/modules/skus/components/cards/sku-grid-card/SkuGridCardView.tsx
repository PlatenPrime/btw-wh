import { Image } from "@/components/shared/media/image/Image";
import {
  URL_DIALOG_IMAGE_FALLBACK,
  UrlDialogImage,
} from "@/components/shared/dialogs";
import { Badge } from "@/components/ui/badge";
import { GridTileCard } from "@/components/shared/cards";
import { cn } from "@/lib/utils";
import { iconSize, typography } from "@/lib/typography";
import { EntityLabel } from "@/components/shared/entities/entity-label";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkuDto } from "@/modules/skus/api/types";
import { Link } from "react-router";

const SKU_CARD_PLACEHOLDER = "https://placehold.co/96x96?text=SKU&font=roboto";

interface SkuGridCardViewProps {
  sku: SkuDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
}

export function SkuGridCardView({ sku, prod, konk }: SkuGridCardViewProps) {
  const hasImage = Boolean(sku.imageUrl?.trim());

  return (
    <GridTileCard className="flex flex-col gap-2 overflow-hidden p-2">
      {sku.isInvalid === true ? (
        <Badge variant="destructive" className="w-fit text-xs">
          Невалідний
        </Badge>
      ) : null}
      <div className="flex min-h-0 min-w-0 items-start gap-3">
        {hasImage ? (
          <UrlDialogImage
            imageUrl={sku.imageUrl}
            alt={sku.title}
            fallbackSrc={URL_DIALOG_IMAGE_FALLBACK}
            previewClassName={cn(
              "bg-muted aspect-square rounded-lg object-cover",
              iconSize.avatarGrid,
            )}
          />
        ) : (
          <div
            className={cn(
              "bg-muted aspect-square overflow-hidden rounded-lg",
              iconSize.avatarGrid,
            )}
          >
            <Image
              src={SKU_CARD_PLACEHOLDER}
              alt=""
              className="size-full object-cover"
            />
          </div>
        )}
        <div className="grid min-w-0 flex-1 gap-1">
          <Link
            to={`/sku/skus/${sku._id}`}
            className="flex min-w-0 hover:underline"
          >
            <span className={cn("line-clamp-4", typography.gridTitle)}>
              {sku.title}
            </span>
          </Link>
          <EntityLabel
            imageUrl={konk?.imageUrl}
            title={konk?.title}
            fallbackLabel={sku.konkName}
            imageSize="xs"
            className={typography.caption}
          />
          <EntityLabel
            imageUrl={prod?.imageUrl}
            title={prod?.title}
            fallbackLabel={sku.prodName}
            imageSize="sm"
            className={typography.gridSubtitle}
          />
        </div>
      </div>
    </GridTileCard>
  );
}
