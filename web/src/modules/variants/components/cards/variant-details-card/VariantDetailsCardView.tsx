import { iconSize, typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { DetailPanelCard } from "@/components/shared/cards";
import { MetricChip } from "@/components/shared/elements";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Image } from "@/components/shared/media/image/Image";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { VariantDto } from "@/modules/variants/api/types";
import { EntityLabel } from "@/components/shared/entities/entity-label";
import { ExternalLink, Store } from "lucide-react";

interface VariantDetailsCardViewProps {
  variant: VariantDto;
  konk?: KonkDto;
  prod?: ProdDto;
}

export function VariantDetailsCardView({
  variant,
  konk,
  prod,
}: VariantDetailsCardViewProps) {
  const konkValue = konk?.title ?? variant.konkName;

  return (
    <DetailPanelCard className="gap-0 overflow-hidden">
      <CardHeader className="p-6">
        <div className="flex items-start gap-4">
          <Image
            src={variant.imageUrl}
            alt={variant.title}
            className="size-20 shrink-0 rounded-lg border bg-muted object-cover"
          />
          <div className="flex min-w-0 flex-col gap-2">
            <h2 className={cn("truncate", typography.detailTitle)}>
              {variant.title}
            </h2>
            <p className={cn("break-all", typography.detailSubtitle)}>
              {variant.url}
            </p>
            <MetricChip
              icon={Store}
              imageUrl={konk?.imageUrl}
              tone="muted"
              label="Конкурент"
              value={konkValue}
              className="w-fit max-w-full"
            />
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-6">
        <a
          href={variant.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-primary inline-flex items-center gap-1.5 hover:underline",
            typography.body,
          )}
        >
          <ExternalLink className={iconSize.ui} />
          Відкрити на сайті конкурента
        </a>
      </CardContent>

      <CardFooter
        className={cn(
          "flex flex-wrap gap-2 border-t-0 p-6 pt-4",
          typography.detailSubtitle,
        )}
      >
        <EntityLabel
          imageUrl={prod?.imageUrl}
          title={prod?.title}
          fallbackLabel={variant.prodName}
          imageSize="sm"
        />
      </CardFooter>
    </DetailPanelCard>
  );
}
