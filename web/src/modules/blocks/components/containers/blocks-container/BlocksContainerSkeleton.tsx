import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";

export function BlocksContainerSkeleton() {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  );
}

