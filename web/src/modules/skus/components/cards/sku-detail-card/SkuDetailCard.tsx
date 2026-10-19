import { DetailPanelCard } from "@/components/shared/cards";
import {
  URL_DIALOG_IMAGE_FALLBACK,
  UrlDialogImage,
} from "@/components/shared/dialogs";
import { KonkBanner } from "@/components/shared/domain/konk-banner";
import { MetricChip } from "@/components/shared/elements";
import { Image } from "@/components/shared/media/image/Image";
import { CardTitle } from "@/components/ui/card";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkuDto, SkuSkugrDto } from "@/modules/skus/api/types";
import { SkuLiveStockContainer } from "@/modules/skus/components/containers/sku-live-stock-container";
import { ExternalLink, Factory, Link2, Tags } from "lucide-react";
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
  const hasImage = Boolean(sku.imageUrl?.trim());
  const hasBtradeAnalog = Boolean(sku.btradeAnalog?.trim());
  const hasSkugrs = skugrs.length > 0;
  const prodValue = prod?.title ?? sku.prodName;

  let skuImageContent: ReactNode;
  if (hasImage) {
    skuImageContent = (
      <UrlDialogImage
        imageUrl={sku.imageUrl}
        alt={sku.title}
        fallbackSrc={URL_DIALOG_IMAGE_FALLBACK}
        previewClassName="bg-muted size-16 shrink-0 overflow-hidden rounded-lg border border-border sm:size-20"
      />
    );
  } else {
    skuImageContent = (
      <div className="bg-muted size-16 shrink-0 overflow-hidden rounded-lg border border-border sm:size-20">
        <Image
          src={SKU_DETAIL_PLACEHOLDER}
          alt=""
          className="size-full object-cover"
        />
      </div>
    );
  }

  return (
    <DetailPanelCard className="gap-0 overflow-hidden p-0">
      <KonkBanner
        konkName={sku.konkName}
        imageUrl={konk?.imageUrl}
        title={konk?.title}
      />
      <div className="grid gap-3 p-4 sm:p-5">
        <div className="flex min-w-0 items-start gap-4">
          {skuImageContent}
          <CardTitle className={typography.detailTitle}>{sku.title}</CardTitle>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          {prodValue ? (
            <MetricChip
              icon={Factory}
              imageUrl={prod?.imageUrl}
              tone="muted"
              label="Виробник"
              value={prodValue}
              className="w-full"
            />
          ) : null}
          {hasBtradeAnalog ? (
            <MetricChip
              icon={Link2}
              tone="info"
              label="Аналог БТрейд"
              value={sku.btradeAnalog}
              className="w-full"
            />
          ) : null}
          {hasSkugrs ? (
            skugrs.map((skugr) => (
              <MetricChip
                key={skugr._id}
                icon={Tags}
                tone="primary"
                label="Група"
                value={
                  <Link
                    to={`/sku/skugrs/${skugr._id}`}
                    className="text-primary hover:underline"
                  >
                    {skugr.title}
                  </Link>
                }
                className="w-full"
              />
            ))
          ) : (
            <span className={cn(typography.detailSubtitle, "sm:col-span-2")}>
              Не входить до жодної товарної групи
            </span>
          )}
          <SkuLiveStockContainer sku={sku} />
          <MetricChip
            icon={ExternalLink}
            tone="primary"
            label="Сайт конкурента"
            value={
              <a
                href={sku.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Відкрити
              </a>
            }
            className="w-full"
          />
        </div>
      </div>
    </DetailPanelCard>
  );
}
