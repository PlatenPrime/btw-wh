import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkuDto } from "@/modules/skus/api/types";
import { SkuGridCard } from "@/modules/skus/components/cards/sku-grid-card";

interface SkusGridProps {
  skus: SkuDto[];
  konk: KonkDto | undefined;
  prods: ProdDto[];
}

export function SkusGrid({ skus, konk, prods }: SkusGridProps) {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {skus.map((sku) => (
        <SkuGridCard key={sku._id} sku={sku} konk={konk} prods={prods} />
      ))}
    </Wrapper>
  );
}
