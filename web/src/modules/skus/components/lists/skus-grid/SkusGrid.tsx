import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkuDto } from "@/modules/skus/api/types";
import { SkuGridCard } from "@/modules/skus/components/cards/sku-grid-card";

interface SkusGridProps {
  skus: SkuDto[];
  /** Якщо задано `konks`, для кожної картки конкурент шукається по `sku.konkName`. */
  konk?: KonkDto | undefined;
  konks?: KonkDto[];
  prods: ProdDto[];
}

export function SkusGrid({ skus, konk, konks, prods }: SkusGridProps) {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {skus.map((sku) => {
        const resolvedKonk =
          konks?.find((k) => k.name === sku.konkName) ?? konk;
        return (
          <SkuGridCard
            key={sku._id}
            sku={sku}
            konk={resolvedKonk}
            prods={prods}
          />
        );
      })}
    </Wrapper>
  );
}
