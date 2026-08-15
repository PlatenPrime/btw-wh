import { ContentRevealStagger } from "@/components/shared/motion";
import type { GraboSkuDto } from "@/modules/grabo-skus/api/types";
import { GraboSkuGridCard } from "@/modules/grabo-skus/components/cards/grabo-sku-grid-card";

interface GraboSkusGridProps {
  skus: GraboSkuDto[];
}

export function GraboSkusGrid({ skus }: GraboSkusGridProps) {
  return (
    <ContentRevealStagger className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {skus.map((sku) => (
        <GraboSkuGridCard key={sku._id} sku={sku} />
      ))}
    </ContentRevealStagger>
  );
}
