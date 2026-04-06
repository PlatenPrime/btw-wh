import { Image } from "@/components/shared/image/image";
import {
  URL_DIALOG_IMAGE_FALLBACK,
  UrlDialogImage,
} from "@/components/shared/url-dialog-image/UrlDialogImage";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  getKonkTheme,
  KonkBanner,
} from "@/modules/analogs/components/common/konk-banner";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
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
    <Card
      className={cn(
        "flex flex-col gap-2 overflow-hidden p-0 transition-shadow",
        theme.shadow,
      )}
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
              previewClassName="bg-muted aspect-square w-full max-w-[6rem] shrink-0 rounded-lg"
            />
          ) : (
            <div className="bg-muted aspect-square w-full max-w-[6rem] shrink-0 overflow-hidden rounded-lg">
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
              <span className="line-clamp-4 text-sm">{sku.title}</span>
            </Link>
            <EntityLabel
              imageUrl={prod?.imageUrl}
              title={prod?.title}
              fallbackLabel={sku.prodName}
              imageSize="sm"
              className="text-muted-foreground text-xs"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
