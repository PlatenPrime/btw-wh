import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Image } from "@/components/shared/image/image";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { VariantDto } from "@/modules/variants/api/types";
import { KonkBanner } from "@/modules/analogs/components/common/konk-banner";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import { ExternalLink } from "lucide-react";

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
  return (
    <Card className="gap-0 overflow-hidden p-0 shadow-md">
      <KonkBanner
        konkName={variant.konkName}
        imageUrl={konk?.imageUrl}
        title={konk?.title}
      />

      <CardHeader className="p-6">
        <div className="flex items-start gap-4">
          <Image
            src={variant.imageUrl}
            alt={variant.title}
            className="size-20 shrink-0 rounded-lg border bg-muted object-cover"
          />
          <div className="flex min-w-0 flex-col">
            <h2 className="text-lg font-semibold truncate">{variant.title}</h2>
            <p className="text-muted-foreground text-sm break-all">
              {variant.url}
            </p>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-6">
        <a
          href={variant.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary inline-flex items-center gap-1.5 text-sm hover:underline"
        >
          <ExternalLink className="size-4 shrink-0" />
          Відкрити на сайті конкурента
        </a>
      </CardContent>

      <CardFooter className="text-muted-foreground flex flex-wrap gap-2 border-t-0 p-6 pt-4">
        <EntityLabel
          imageUrl={prod?.imageUrl}
          title={prod?.title}
          fallbackLabel={variant.prodName}
          imageSize="sm"
        />
      </CardFooter>
    </Card>
  );
}

