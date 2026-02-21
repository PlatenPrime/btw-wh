import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { ProdCardSkeleton } from "@/modules/prods/components/cards/prod-card";

export function ProdsContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <Wrapper className="grid grid-cols-1 gap-2 p-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProdCardSkeleton key={index} />
        ))}
      </Wrapper>
    </div>
  );
}
