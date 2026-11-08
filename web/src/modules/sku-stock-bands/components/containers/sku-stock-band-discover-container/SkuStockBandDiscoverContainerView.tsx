import { SurfaceSection } from "@/components/shared/layout";
import { Button } from "@/components/ui/button";
import type { DiscoverStockBandPayload } from "@/modules/sku-stock-bands/api/types";
import { SkuStockBandDiscoverTable } from "@/modules/sku-stock-bands/components/tables/sku-stock-band-discover-table";
import { typography } from "@/lib/typography";

interface SkuStockBandDiscoverContainerViewProps {
  data: DiscoverStockBandPayload;
  selectedProductIds: Set<string>;
  canBatch: boolean;
  isBatching: boolean;
  onToggleProductId: (productId: string, checked: boolean) => void;
  onToggleAll: (checked: boolean) => void;
  onBatchCorrect: () => void;
}

const numberFormat = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 0,
});

export function SkuStockBandDiscoverContainerView({
  data,
  selectedProductIds,
  canBatch,
  isBatching,
  onToggleProductId,
  onToggleAll,
  onBatchCorrect,
}: SkuStockBandDiscoverContainerViewProps) {
  const selectedCount = selectedProductIds.size;

  return (
    <SurfaceSection className="grid gap-3 p-2">
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
        <div className="grid gap-0.5">
          <p className={typography.listTitleCompact}>
            Кандидати · {numberFormat.format(data.items.length)}
          </p>
          <p className={typography.listSubtitle}>
            Смуга {numberFormat.format(data.band.min)}–
            {numberFormat.format(data.band.max)}, норма ≤{" "}
            {numberFormat.format(data.band.normalMax)}
          </p>
        </div>
        {canBatch ? (
          <Button
            type="button"
            variant="edit"
            disabled={selectedCount === 0 || isBatching}
            onClick={onBatchCorrect}
          >
            {isBatching
              ? "Ставлю задачу…"
              : `Виправити обрані (${numberFormat.format(selectedCount)})`}
          </Button>
        ) : null}
      </div>
      <SkuStockBandDiscoverTable
        items={data.items}
        selectedProductIds={selectedProductIds}
        onToggleProductId={onToggleProductId}
        onToggleAll={onToggleAll}
      />
    </SurfaceSection>
  );
}
