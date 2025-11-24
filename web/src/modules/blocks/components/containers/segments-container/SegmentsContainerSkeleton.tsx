import { Skeleton } from "@/components/ui/skeleton";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";

export function SegmentsContainerSkeleton() {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-24 w-full" />
      ))}
    </Wrapper>
  );
}

