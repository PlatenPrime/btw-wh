import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { ProdDto } from "@/modules/prods/api/types";
import { ProdCard } from "@/modules/prods/components/cards/prod-card";

interface ProdsGridProps {
  prods: ProdDto[];
}

export function ProdsGrid({ prods }: ProdsGridProps) {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2 ">
      {prods.map((prod) => (
        <ProdCard key={prod._id} prod={prod} />
      ))}
    </Wrapper>
  );
}
