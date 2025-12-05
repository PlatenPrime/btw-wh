import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AskPullPositionsContainerSkeleton() {
  return (
    <Wrapper className="grid gap-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-5 w-32" />
      </div>
      <div className="grid max-w-xl gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="p-0">
            <CardContent className="p-0">
              <div className="rounded-md px-2 py-1">
                <div className="grid grid-cols-3 gap-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-8" />
                  <Skeleton className="h-5 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Wrapper>
  );
}
