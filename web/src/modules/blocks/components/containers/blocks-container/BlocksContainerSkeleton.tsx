import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { BlockCardSkeleton } from "@/modules/blocks/components/cards/block-card";

export function BlocksContainerSkeleton() {
  return (
    <div className="grid gap-2 p-2">
      <div className="grid gap-2 md:flex">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-44" />
        ))}
      </div>
      <Wrapper className="grid grid-cols-1 gap-2 p-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <BlockCardSkeleton key={i} />
        ))}
      </Wrapper>
    </div>
  );
}
