import { ChartDateRangeToolbar } from "@/components/shared/chart-date-range-toolbar/ChartDateRangeToolbar";
import { Image } from "@/components/shared/image/image";
import {
  URL_DIALOG_IMAGE_FALLBACK,
  UrlDialogImage,
} from "@/components/shared/url-dialog-image/UrlDialogImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  getKonkTheme,
  KonkBanner,
} from "@/modules/analogs/components/common/konk-banner";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkuDto } from "@/modules/skus/api/types";
import { SkuSalesChartContainer } from "@/modules/skus/components/containers/sku-sales-chart-container";
import { SkuSlicesChartContainer } from "@/modules/skus/components/containers/sku-slices-chart-container";
import { ExternalLink } from "lucide-react";

const SKU_DETAIL_PLACEHOLDER =
  "https://placehold.co/160x160?text=SKU&font=roboto";

interface SkuContainerViewProps {
  sku: SkuDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
  dateFrom: string;
  dateTo: string;
  onDateRangeChange: (from: string, to: string) => void;
}

export function SkuContainerView({
  sku,
  konk,
  prod,
  dateFrom,
  dateTo,
  onDateRangeChange,
}: SkuContainerViewProps) {
  const theme = getKonkTheme(sku.konkName);
  const hasImage = Boolean(sku.imageUrl?.trim());

  return (
    <div className="grid gap-2">
      <Card
        className={cn("overflow-hidden p-0 transition-shadow", theme.shadow)}
      >
        <KonkBanner
          konkName={sku.konkName}
          imageUrl={konk?.imageUrl}
          title={konk?.title}
        />
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start">
          {hasImage ? (
            <UrlDialogImage
              imageUrl={sku.imageUrl}
              alt={sku.title}
              fallbackSrc={URL_DIALOG_IMAGE_FALLBACK}
              previewClassName="bg-muted size-40 shrink-0 overflow-hidden rounded-lg"
            />
          ) : (
            <div className="bg-muted size-40 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={SKU_DETAIL_PLACEHOLDER}
                alt=""
                className="size-full object-cover"
              />
            </div>
          )}
          <div className="grid min-w-0 flex-1 gap-2">
            <CardTitle className="text-base">{sku.title}</CardTitle>
            <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
              {prod ? (
                <EntityLabel
                  imageUrl={prod.imageUrl}
                  title={prod.title}
                  fallbackLabel={sku.prodName}
                  imageSize="sm"
                />
              ) : (
                <span>{sku.prodName}</span>
              )}
              {sku.btradeAnalog?.trim() ? (
                <span>Аналог БТрейд: {sku.btradeAnalog}</span>
              ) : null}
            </div>
            <a
              href={sku.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
            >
              <ExternalLink className="size-4 shrink-0" />
              Відкрити на сайті конкурента
            </a>
          </div>
        </CardHeader>
      </Card>
      <div className="grid gap-3">
        <ChartDateRangeToolbar
          idPrefix="sku-charts"
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateRangeChange={onDateRangeChange}
        />
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <Card className="overflow-hidden shadow-md">
            <CardHeader className="pb-2">
              <h3 className="text-muted-foreground text-sm font-medium">
                Динаміка залишків та ціни
              </h3>
            </CardHeader>
            <CardContent>
              <SkuSlicesChartContainer
                skuId={sku._id}
                dateFrom={dateFrom}
                dateTo={dateTo}
              />
            </CardContent>
          </Card>
          <Card className="overflow-hidden shadow-md">
            <CardHeader className="pb-2">
              <h3 className="text-muted-foreground text-sm font-medium">
                Динаміка продаж
              </h3>
            </CardHeader>
            <CardContent>
              <SkuSalesChartContainer
                skuId={sku._id}
                dateFrom={dateFrom}
                dateTo={dateTo}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
