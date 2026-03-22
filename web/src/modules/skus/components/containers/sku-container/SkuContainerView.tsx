import { Image } from "@/components/shared/image/image";
import {
  URL_DIALOG_IMAGE_FALLBACK,
  UrlDialogImage,
} from "@/components/shared/url-dialog-image/UrlDialogImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { format, subDays } from "date-fns";
import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

const SKU_DETAIL_PLACEHOLDER =
  "https://placehold.co/160x160?text=SKU&font=roboto";

const PERIOD_OPTIONS = [
  { value: "7", label: "7 днів" },
  { value: "30", label: "30 днів" },
  { value: "90", label: "90 днів" },
] as const;

function getPeriod(days: number): { dateFrom: string; dateTo: string } {
  const today = new Date();
  const from = subDays(today, days - 1);
  return {
    dateFrom: format(from, "yyyy-MM-dd"),
    dateTo: format(today, "yyyy-MM-dd"),
  };
}

interface SkuContainerViewProps {
  sku: SkuDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
}

export function SkuContainerView({ sku, konk, prod }: SkuContainerViewProps) {
  const theme = getKonkTheme(sku.konkName);
  const hasImage = Boolean(sku.imageUrl?.trim());
  const [periodDays, setPeriodDays] = useState<number>(30);
  const { dateFrom, dateTo } = useMemo(
    () => getPeriod(periodDays),
    [periodDays],
  );

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
        <div className="flex flex-wrap items-center gap-4">
          <Label
            htmlFor="sku-charts-period"
            className="text-muted-foreground text-sm"
          >
            Період
          </Label>
          <Select
            value={String(periodDays)}
            onValueChange={(v) => setPeriodDays(Number(v))}
          >
            <SelectTrigger id="sku-charts-period" className="w-[120px]" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PERIOD_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
