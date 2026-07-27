import { Image } from "@/components/shared/media/image/Image";
import {
  URL_DIALOG_IMAGE_FALLBACK,
  UrlDialogImage,
} from "@/components/shared/dialogs";
import { DetailPanelCard } from "@/components/shared/cards";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { iconSize, typography } from "@/lib/typography";
import {
  getKonkTheme,
  KonkBanner,
} from "@/components/shared/domain/konk-banner";
import { EntityLabel } from "@/components/shared/entities/entity-label";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkuDto, SkuSkugrDto } from "@/modules/skus/api/types";
import { SkuLiveStockContainer } from "@/modules/skus/components/containers/sku-live-stock-container";
import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

const SKU_DETAIL_PLACEHOLDER =
  "https://placehold.co/160x160?text=SKU&font=roboto";

interface SkuDetailCardProps {
  sku: SkuDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
  skugrs: SkuSkugrDto[];
}

export function SkuDetailCard({ sku, konk, prod, skugrs }: SkuDetailCardProps) {
  const theme = getKonkTheme(sku.konkName);
  const hasImage = Boolean(sku.imageUrl?.trim());
  const hasBtradeAnalog = Boolean(sku.btradeAnalog?.trim());
  const hasSkugrs = skugrs.length > 0;

  let skuImageContent: ReactNode;
  if (hasImage) {
    skuImageContent = (
      <UrlDialogImage
        imageUrl={sku.imageUrl}
        alt={sku.title}
        fallbackSrc={URL_DIALOG_IMAGE_FALLBACK}
        previewClassName="bg-muted size-40 shrink-0 overflow-hidden rounded-lg"
      />
    );
  } else {
    skuImageContent = (
      <div className="bg-muted size-40 shrink-0 overflow-hidden rounded-lg">
        <Image src={SKU_DETAIL_PLACEHOLDER} alt="" className="size-full object-cover" />
      </div>
    );
  }

  let prodLabelContent: ReactNode;
  if (prod) {
    prodLabelContent = (
      <EntityLabel
        imageUrl={prod.imageUrl}
        title={prod.title}
        fallbackLabel={sku.prodName}
        imageSize="sm"
      />
    );
  } else {
    prodLabelContent = <span>{sku.prodName}</span>;
  }

  return (
    <DetailPanelCard className={cn("overflow-hidden p-0", theme.shadow)}>
      <KonkBanner
        konkName={sku.konkName}
        imageUrl={konk?.imageUrl}
        title={konk?.title}
      />
      <CardHeader className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-start">
        {skuImageContent}
        <div className="grid min-w-0 flex-1 gap-2">
          <CardTitle className={typography.detailTitle}>{sku.title}</CardTitle>
          <div className={cn("flex flex-wrap items-center gap-3", typography.detailSubtitle)}>
            {prodLabelContent}
            {hasBtradeAnalog && <span>Аналог БТрейд: {sku.btradeAnalog}</span>}
          </div>
          <a
            href={sku.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("text-primary inline-flex items-center gap-1 hover:underline", typography.body)}
          >
            <ExternalLink className={iconSize.ui} />
            Відкрити на сайті конкурента
          </a>
          <SkuLiveStockContainer sku={sku} />
          <div className="grid gap-2">
            <span className={cn("font-medium", typography.detailSubtitle)}>
              Товарні групи
            </span>
            {hasSkugrs ? (
              <div className="flex flex-wrap gap-2">
                {skugrs.map((skugr) => (
                  <Link
                    key={skugr._id}
                    to={`/sku/skugrs/${skugr._id}`}
                    className={cn("bg-muted hover:bg-muted/80 rounded-md px-2 py-1 transition-colors", typography.body)}
                  >
                    {skugr.title}
                  </Link>
                ))}
              </div>
            ) : (
              <span className={typography.detailSubtitle}>
                Не входить до жодної товарної групи
              </span>
            )}
          </div>
        </div>
      </CardHeader>
    </DetailPanelCard>
  );
}
