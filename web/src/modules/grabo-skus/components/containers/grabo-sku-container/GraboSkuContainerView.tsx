import type { GraboSkuDto } from "@/modules/grabo-skus/api/types";
import { GraboSkuDetailCard } from "@/modules/grabo-skus/components/cards/grabo-sku-detail-card";

export interface GraboSkuContainerViewProps {
  sku: GraboSkuDto;
}

export function GraboSkuContainerView({ sku }: GraboSkuContainerViewProps) {
  return (
    <div className="grid gap-2">
      <GraboSkuDetailCard sku={sku} />
    </div>
  );
}
