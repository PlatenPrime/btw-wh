import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { SkuStockBandsControlsView } from "@/modules/sku-stock-bands/components/controls/sku-stock-bands-controls/SkuStockBandsControlsView";

interface SkuStockBandsControlsProps {
  konkName: string;
  onKonkNameChange: (value: string) => void;
}

export function SkuStockBandsControls({
  konkName,
  onKonkNameChange,
}: SkuStockBandsControlsProps) {
  const konksQuery = useKonksQuery();

  return (
    <SkuStockBandsControlsView
      konkName={konkName}
      konks={konksQuery.data?.data ?? []}
      onKonkNameChange={onKonkNameChange}
    />
  );
}
