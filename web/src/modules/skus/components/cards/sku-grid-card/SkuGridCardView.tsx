import { Image } from "@/components/shared/media/image/Image";
import {
  URL_DIALOG_IMAGE_FALLBACK,
  UrlDialogImage,
} from "@/components/shared/dialogs";
import { Badge } from "@/components/ui/badge";
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
import type { SkuDto } from "@/modules/skus/api/types";
import { Link } from "react-router";

const SKU_CARD_PLACEHOLDER = "https://placehold.co/96x96?text=SKU&font=roboto";

interface SkuGridCardViewProps {
  sku: SkuDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
}

export function SkuGridCardView({ sku, prod, konk }: SkuGridCardViewProps) {
  const theme = getKonkTheme(sku.konkName);
  const hasImage = Boolean(sku.imageUrl?.trim());

  return (
    <GridTileCard
      className={cn("flex flex-col gap-2 overflow-hidden p-0", theme.shadow)}
    >
      <KonkBanner
        konkName={sku.konkName}
        imageUrl={konk?.imageUrl}
        title={konk?.title}
      />
      {sku.isInvalid === true ? (
        <div className="px-2 pt-1">
          <Badge variant="destructive" className="text-xs">
            Невалідний
          </Badge>
        </div>
      ) : null}
      <div className="flex flex-col gap-2 px-2 pb-1">
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
          <div className="grid gap-1">
            <Link
              to={`/sku/skus/${sku._id}`}
              className="flex min-w-0 flex-1 hover:underline"
            >
              <span className={cn("line-clamp-4", typography.gridTitle)}>
                {sku.title}
              </span>
            </Link>
            <EntityLabel
              imageUrl={prod?.imageUrl}
              title={prod?.title}
              fallbackLabel={sku.prodName}
              imageSize="sm"
              className={typography.gridSubtitle}
            />
          </div>
        </div>
      </div>
    </GridTileCard>
  );
}
