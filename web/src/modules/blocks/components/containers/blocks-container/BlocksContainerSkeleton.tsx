import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BlocksContainerSkeleton() {
  return (
    <div className="grid gap-2 p-2">
      <div className="grid gap-2 md:flex">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-44" />
        ))}
      </div>
      <Wrapper className="grid grid-cols-1 gap-2 p-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="gap-0 p-2">
            <CardHeader className="p-0">
              <div className="flex items-center justify-between">
                <div className="flex flex-row items-center justify-start gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <Skeleton className="h-8 w-8" />
              </div>
            </CardHeader>
            <CardContent className="grid gap-2 p-0" />
          </Card>
        ))}
      </Wrapper>
    </div>
  );
}
