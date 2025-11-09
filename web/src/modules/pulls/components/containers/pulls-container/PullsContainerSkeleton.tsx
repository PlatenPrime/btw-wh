import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export function PullsContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <Wrapper className="flex items-center justify-between gap-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-24" />
      </Wrapper>
      <Wrapper>
        <div className="grid gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </Wrapper>
    </div>
  );
}
