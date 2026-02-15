import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DelCardSkeleton() {
  return (
    <Card className="gap-0 p-2 transition-shadow hover:shadow-md">
      <CardHeader className="p-0">
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="grid gap-2 p-0">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </CardContent>
    </Card>
  );
}
