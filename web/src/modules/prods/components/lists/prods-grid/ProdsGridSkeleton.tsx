import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { ProdCardSkeleton } from "@/modules/prods/components/cards/prod-card";

const SKELETON_ITEMS_COUNT = 8;

export function ProdsGridSkeleton() {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2">
      {Array.from({ length: SKELETON_ITEMS_COUNT }).map((_, index) => (
        <ProdCardSkeleton key={index} />
      ))}
    </Wrapper>
  );
}
