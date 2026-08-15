import { Image } from "@/components/shared/media/image/Image";
import {
  URL_DIALOG_IMAGE_FALLBACK,
  UrlDialogImage,
} from "@/components/shared/dialogs";
import { Badge } from "@/components/ui/badge";
import { GridTileCard } from "@/components/shared/cards";
import { cn } from "@/lib/utils";
import { iconSize, typography } from "@/lib/typography";
import type { GraboSkuDto } from "@/modules/grabo-skus/api/types";
import { Link } from "react-router";

const GRABO_CARD_PLACEHOLDER =
  "https://placehold.co/96x96?text=Grabo&font=roboto";

interface GraboSkuGridCardProps {
  sku: GraboSkuDto;
}

export function GraboSkuGridCard({ sku }: GraboSkuGridCardProps) {
  const imageUrl = (sku.images ?? []).find((src) => src.trim()) ?? "";
  const hasImage = Boolean(imageUrl);

  return (
    <GridTileCard className="flex flex-col gap-2 overflow-hidden p-0">
      {(sku.isNewProduct === true || sku.isOnSite === false) && (
        <div className="flex flex-wrap gap-1 px-2 pt-2">
          {sku.isNewProduct === true ? (
            <Badge variant="success" className="text-xs">
              Новинка
            </Badge>
          ) : null}
          {sku.isOnSite === false ? (
            <Badge variant="destructive" className="text-xs">
              Не на сайті
            </Badge>
          ) : null}
        </div>
      )}
      <div className="flex flex-col gap-2 px-2 pb-2">
        <div className="flex min-h-0 min-w-0 items-start gap-3">
          {hasImage ? (
            <UrlDialogImage
              imageUrl={imageUrl}
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
                src={GRABO_CARD_PLACEHOLDER}
                alt=""
                className="size-full object-cover"
              />
            </div>
          )}
          <div className="grid min-w-0 gap-1">
            <Link
              to={`/sku/grabo/${sku._id}`}
              className="flex min-w-0 flex-1 hover:underline"
            >
              <span className={cn("line-clamp-4", typography.gridTitle)}>
                {sku.title}
              </span>
            </Link>
            <span className={typography.gridSubtitle}>{sku.productId}</span>
          </div>
        </div>
      </div>
    </GridTileCard>
  );
}
