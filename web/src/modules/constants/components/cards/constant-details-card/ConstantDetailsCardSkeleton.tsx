import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ConstantDetailsCardSkeleton() {
  return (
    <Card className="p-2">
      <CardHeader className="p-0 pb-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="mt-1 h-4 w-32" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-0">
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-24 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}
