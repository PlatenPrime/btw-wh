import { DetailPanelCard } from "@/components/shared/cards";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { iconSize, typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import {
  getKonkTheme,
  KonkBanner,
} from "@/components/shared/domain/konk-banner";
import { EntityLabel } from "@/components/shared/entities/entity-label";
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
    <DetailPanelCard
      className={cn("gap-2 overflow-hidden p-0", theme.shadow)}
    >
      <KonkBanner
        konkName={skugr.konkName}
        imageUrl={konk?.imageUrl}
        title={konk?.title}
      />
      <CardHeader className="gap-2 p-2">
        <CardTitle className={typography.detailTitle}>{skugr.title}</CardTitle>
        <div className={cn("flex flex-wrap items-center gap-3", typography.detailSubtitle)}>
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
          className={cn("text-primary inline-flex items-center gap-1 hover:underline", typography.body)}
        >
          <ExternalLink className={iconSize.ui} />
          Посилання на дані
        </a>
      </CardHeader>
    </DetailPanelCard>
  );
}
