import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export function SegmentContainerSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Wrapper>
        <Skeleton className="h-32 w-full" />
      </Wrapper>
      <Wrapper>
        <Skeleton className="h-24 w-full" />
      </Wrapper>
    </div>
  );
}

