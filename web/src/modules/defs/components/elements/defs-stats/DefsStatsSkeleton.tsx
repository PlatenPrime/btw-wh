import { SurfaceSection } from "@/components/shared/layout";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DefsStatsSkeleton() {
  return (
    <div className="grid gap-2">
      <Skeleton className="h-4 w-48" />
      <SurfaceSection className="flex flex-col gap-2 sm:flex-row">
        <Card className="flex flex-row justify-between gap-2 p-2 py-1 text-sm">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-8" />
        </Card>
        <Card className="flex flex-row justify-between gap-2 p-2 py-1 text-sm">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-8" />
        </Card>
        <Card className="flex flex-row justify-between gap-2 p-2 py-1 text-sm">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-8" />
        </Card>
      </SurfaceSection>
    </div>
  );
}
