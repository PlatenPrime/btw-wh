import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { SkugrGridCard } from "@/modules/skugrs/components/cards/skugr-grid-card";
import type { SkugrDto } from "@/modules/skugrs/api/types";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";

interface SkugrsGridProps {
  skugrs: SkugrDto[];
  konks: KonkDto[];
  prods: ProdDto[];
  onEdit?: (skugr: SkugrDto) => void;
}

export function SkugrsGrid({ skugrs, konks, prods, onEdit }: SkugrsGridProps) {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {skugrs.map((skugr) => (
        <SkugrGridCard
          key={skugr._id}
          skugr={skugr}
          konks={konks}
          prods={prods}
          onEdit={onEdit}
        />
      ))}
    </Wrapper>
  );
}
