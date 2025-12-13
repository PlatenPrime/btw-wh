import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export function PullsContainerSkeleton() {
  return (
    <Wrapper className="grid gap-4">
      <div className="grid gap-2">
        <Skeleton className="h-7 w-48" />
      </div>
      <div className="grid gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-32 w-full" />
        ))}
      </div>
    </Wrapper>
  );
}

