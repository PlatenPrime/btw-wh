import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BlocksContainerSkeleton() {
  return (
    <div className="grid gap-2 p-2">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-44" />
        ))}
      </div>
      <Wrapper className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="gap-0 p-2">
            <CardHeader className="p-0">
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent className="grid gap-2 p-0">
              <Skeleton className="h-4 w-16" />
            </CardContent>
          </Card>
        ))}
      </Wrapper>
    </div>
  );
}

