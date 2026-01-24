import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { DefCardSkeleton } from "@/modules/defs/components/cards/def-card/DefCardSkeleton";

export function DefsGridSkeleton() {
  return (
    <Wrapper className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <DefCardSkeleton key={index} />
      ))}
    </Wrapper>
  );
}
