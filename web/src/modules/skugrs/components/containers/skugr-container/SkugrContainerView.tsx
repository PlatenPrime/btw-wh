import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  getKonkTheme,
  KonkBanner,
} from "@/modules/analogs/components/common/konk-banner";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import { SkusGrid } from "@/modules/skus/components/lists/skus-grid";
import { SkugrDetailHeaderActions } from "@/modules/skugrs/components/actions/skugr-detail-header-actions/SkugrDetailHeaderActions";
import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { ExternalLink } from "lucide-react";

interface SkugrContainerViewProps {
  skugr: SkugrPageDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
  prods: ProdDto[];
}

export function SkugrContainerView({
  skugr,
  konk,
  prod,
  prods,
}: SkugrContainerViewProps) {
  const theme = getKonkTheme(skugr.konkName);

  return (
    <>
      <SkugrDetailHeaderActions skugr={skugr} />
      <div className="grid gap-4">
        <Card
          className={cn("overflow-hidden p-0 transition-shadow", theme.shadow)}
        >
          <KonkBanner
            konkName={skugr.konkName}
            imageUrl={konk?.imageUrl}
            title={konk?.title}
          />
          <CardHeader className="gap-2">
            <CardTitle className="text-xl">{skugr.title}</CardTitle>
            <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
              {prod ? (
                <EntityLabel
                  imageUrl={prod.imageUrl}
                  title={prod.title}
                  fallbackLabel={skugr.prodName}
                  imageSize="sm"
                />
              ) : (
                <span>{skugr.prodName}</span>
              )}
              <span>
                Оновлено:{" "}
                {new Date(skugr.updatedAt).toLocaleString("uk-UA", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </span>
            </div>
            <a
              href={skugr.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
            >
              <ExternalLink className="size-4" />
              Відкрити сторінку групи на сайті конкурента
            </a>
          </CardHeader>
          <CardContent className="text-muted-foreground border-t pt-4 text-xs">
            Створено:{" "}
            {new Date(skugr.createdAt).toLocaleString("uk-UA", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </CardContent>
        </Card>

        <section className="grid gap-2">
          <h2 className="text-lg font-semibold">Товари в групі</h2>
          {skugr.skus.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              У групі ще немає товарів. Для ADMIN доступне заповнення з браузера через меню
              дій у заголовку.
            </p>
          ) : (
            <SkusGrid skus={skugr.skus} konk={konk} prods={prods} />
          )}
        </section>
      </div>
    </>
  );
}
