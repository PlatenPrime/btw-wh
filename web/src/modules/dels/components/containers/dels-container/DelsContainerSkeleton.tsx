import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { DelCardSkeleton } from "@/modules/dels/components/cards/del-card";

export function DelsContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <Wrapper className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <DelCardSkeleton key={index} />
        ))}
      </Wrapper>
    </div>
  );
}
