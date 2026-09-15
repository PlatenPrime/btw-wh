import { SurfaceSection } from "@/components/shared/layout";
import type { PackFlipsPayload } from "@/modules/sku-analytics/api/types";
import { SkuPackFlipsTable } from "@/modules/sku-analytics/components/tables/sku-pack-flips-table";

export interface SkuPackFlipsContainerViewProps {
  data: PackFlipsPayload;
  dateLabel: string;
}

export function SkuPackFlipsContainerView({
  data,
  dateLabel,
}: SkuPackFlipsContainerViewProps) {
  return (
    <div className="grid gap-4">
      <p className="text-muted-foreground text-sm">
        {data.konkName} · {dateLabel}
      </p>

      <SurfaceSection className="grid gap-3 p-0">
        <div className="grid gap-1 px-3 pt-3">
          <h2 className="text-base font-semibold">
            Кратна інверсія ({data.patched.length})
          </h2>
          <p className="text-muted-foreground text-sm">
            Пропонований рескейл, зрізи не змінюються
          </p>
        </div>
        <SkuPackFlipsTable variant="patched" items={data.patched} />
      </SurfaceSection>

      <SurfaceSection className="grid gap-3 p-0">
        <div className="grid gap-1 px-3 pt-3">
          <h2 className="text-base font-semibold">
            Скачок лише ціни ({data.priceOnly.length})
          </h2>
          <p className="text-muted-foreground text-sm">
            Залишок у межах ±10%, рескейл не пропонується
          </p>
        </div>
        <SkuPackFlipsTable variant="priceOnly" items={data.priceOnly} />
      </SurfaceSection>

      <SurfaceSection className="grid gap-3 p-0">
        <div className="grid gap-1 px-3 pt-3">
          <h2 className="text-base font-semibold">
            Неоднозначні серії ({data.ambiguous.length})
          </h2>
          <p className="text-muted-foreground text-sm">
            Немає однозначного повернення до одного масштабу
          </p>
        </div>
        <SkuPackFlipsTable variant="ambiguous" items={data.ambiguous} />
      </SurfaceSection>
    </div>
  );
}
