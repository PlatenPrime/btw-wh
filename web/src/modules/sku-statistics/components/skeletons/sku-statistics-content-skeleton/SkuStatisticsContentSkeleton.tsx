import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export function SkuStatisticsContentSkeleton() {
  return (
    <div className="grid gap-4">
      <Wrapper className="grid gap-4 p-4">
        <div className="grid justify-items-center gap-4 py-2">
          <Skeleton className="h-52 w-52 rounded-full" />
        </div>
      </Wrapper>

      <Wrapper className="p-0">
        <div className="grid gap-2 p-3">
          <Skeleton className="h-8 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </Wrapper>
    </div>
  );
}
