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

interface SkuGridCardViewProps {
  sku: SkuDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
}

export function SkuGridCardView({ sku, konk, prod }: SkuGridCardViewProps) {
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

      <div className="flex flex-col gap-2 px-2 pb-1">
        <div className="flex min-h-0 min-w-0 items-start gap-3">
          {hasImage ? (
            <a
              href={sku.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-muted block aspect-square w-full max-w-[6rem] shrink-0 overflow-hidden rounded-lg"
            >
              <img
                src={sku.imageUrl}
                alt=""
                className="size-full object-cover"
              />
            </a>
          ) : (
            <a
              href={sku.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-muted aspect-square block w-full max-w-[6rem] shrink-0 rounded-lg"
            />
          )}
          <a
            href={sku.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex min-w-0 flex-1"
          >
            <span className="line-clamp-4 text-sm font-semibold">
              {sku.title}
            </span>
          </a>
        </div>
      </div>

      <div className="text-muted-foreground flex justify-center pb-2 text-xs">
        <EntityLabel
          imageUrl={prod?.imageUrl}
          title={prod?.title}
          fallbackLabel={sku.prodName}
          imageSize="sm"
        />
      </div>
    </Card>
  );
}
