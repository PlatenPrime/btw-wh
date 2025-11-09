import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DefsStatsSkeleton() {
  return (
    <Wrapper className="flex gap-2">
      {/* Дефіцитів skeleton */}
      <Card className="flex flex-row gap-2 p-2 text-sm">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-8" />
      </Card>

      {/* Критичних skeleton */}
      <Card className="flex flex-row gap-2 p-2 text-sm">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-8" />
      </Card>

      {/* В ліміті skeleton */}
      <Card className="flex flex-row gap-2 p-2 text-sm">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-8" />
      </Card>
    </Wrapper>
  );
}
