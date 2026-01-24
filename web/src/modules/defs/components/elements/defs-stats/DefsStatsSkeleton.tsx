import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DefsStatsSkeleton() {
  return (
    <Wrapper className="flex flex-col gap-2 sm:flex-row">
      {/* Дефіцитів skeleton */}
      <Card className="flex flex-row justify-between gap-2 p-2 py-1 text-sm">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-8" />
      </Card>

      {/* Критичних skeleton */}
      <Card className="flex flex-row justify-between gap-2 p-2 py-1 text-sm">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-8" />
      </Card>

      {/* В ліміті skeleton */}
      <Card className="flex flex-row justify-between gap-2 p-2 py-1 text-sm">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-8" />
      </Card>
    </Wrapper>
  );
}
