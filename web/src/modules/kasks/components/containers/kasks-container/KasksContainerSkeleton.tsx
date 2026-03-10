import { Skeleton } from "@/components/ui/skeleton";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";

export function KasksContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <Wrapper className="flex gap-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-8 w-8" />
      </Wrapper>
      <Wrapper>
        <div className="grid gap-2 p-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </Wrapper>
    </div>
  );
}
