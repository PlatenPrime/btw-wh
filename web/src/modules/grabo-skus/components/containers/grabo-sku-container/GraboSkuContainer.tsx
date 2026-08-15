import type { GraboSkuDto } from "@/modules/grabo-skus/api/types";
import { GraboSkuContainerView } from "@/modules/grabo-skus/components/containers/grabo-sku-container/GraboSkuContainerView";

interface GraboSkuContainerProps {
  sku: GraboSkuDto;
}

export function GraboSkuContainer({ sku }: GraboSkuContainerProps) {
  return <GraboSkuContainerView sku={sku} />;
}
