import { DetailPanelCard } from "@/components/shared/cards";
import { MetricChip } from "@/components/shared/elements";
import { CardTitle } from "@/components/ui/card";
import { typography } from "@/lib/typography";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { ExternalLink, Factory, Store } from "lucide-react";

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
  const prodValue = prod?.title ?? skugr.prodName;
  const konkValue = konk?.title ?? skugr.konkName;

  return (
    <DetailPanelCard className="gap-3 overflow-hidden p-4 sm:p-5">
      <CardTitle className={typography.detailTitle}>{skugr.title}</CardTitle>

      <div className="grid gap-2 sm:grid-cols-2">
        <MetricChip
          icon={Store}
          imageUrl={konk?.imageUrl}
          tone="muted"
          label="Конкурент"
          value={konkValue}
          className="w-full"
        />
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
        <MetricChip
          icon={ExternalLink}
          tone="primary"
          label="Посилання на дані"
          value={
            <a
              href={skugr.url}
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
    </DetailPanelCard>
  );
}
