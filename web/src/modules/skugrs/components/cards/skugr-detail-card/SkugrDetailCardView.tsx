import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  getKonkTheme,
  KonkBanner,
} from "@/modules/analogs/components/common/konk-banner";
import { EntityLabel } from "@/modules/analogs/components/entity-label";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { ExternalLink } from "lucide-react";

interface SkugrDetailCardViewProps {
  skugr: SkugrPageDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
}

export function SkugrDetailCardView({
  skugr,
  konk,
  prod,
}: SkugrDetailCardViewProps) {
  const theme = getKonkTheme(skugr.konkName);

  return (
    <Card
      className={cn("overflow-hidden p-0 gap-2 transition-shadow", theme.shadow)}
    >
      <KonkBanner
        konkName={skugr.konkName}
        imageUrl={konk?.imageUrl}
        title={konk?.title}
      />
      <CardHeader className="gap-2 p-2">
        <CardTitle className="text-xl">{skugr.title}</CardTitle>
        <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
          {prod ? (
            <EntityLabel
              imageUrl={prod.imageUrl}
              title={prod.title}
              fallbackLabel={skugr.prodName}
              imageSize="md"
            />
          ) : (
            <span>{skugr.prodName}</span>
          )}
        </div>
        <a
          href={skugr.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
        >
          <ExternalLink className="size-4" />
          Посилання на дані
        </a>
      </CardHeader>
    </Card>
  );
}
