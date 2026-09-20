import type {
  PackFlipFindingDto,
  PackFlipsPayload,
} from "@/modules/sku-analytics/api/types";
import { SkuPackFlipsContainerView } from "@/modules/sku-analytics/components/containers/sku-pack-flips-container/SkuPackFlipsContainerView";
import type { SkuPackFlipsTableVariant } from "@/modules/sku-analytics/components/tables/sku-pack-flips-table";

export interface SkuPackFlipsContainerProps {
  data: PackFlipsPayload;
}

function buildVisibleSections(data: PackFlipsPayload) {
  const sections: Array<{
    variant: SkuPackFlipsTableVariant;
    items: PackFlipFindingDto[];
  }> = [
    { variant: "patched", items: data.patched },
    { variant: "priceOnly", items: data.priceOnly },
    { variant: "ambiguous", items: data.ambiguous },
  ];

  return sections.filter((section) => section.items.length > 0);
}

export function SkuPackFlipsContainer({ data }: SkuPackFlipsContainerProps) {
  return (
    <SkuPackFlipsContainerView sections={buildVisibleSections(data)} />
  );
}
