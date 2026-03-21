import { Skeleton } from "@/components/ui/skeleton";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";

interface SkugrsGridSkeletonProps {
  count?: number;
}

export function SkugrsGridSkeleton({ count = 8 }: SkugrsGridSkeletonProps) {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-56 rounded-lg" />
      ))}
    </Wrapper>
  );
}
