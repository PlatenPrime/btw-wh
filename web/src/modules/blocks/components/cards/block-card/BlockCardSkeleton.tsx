import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BlockCardSkeleton() {
  return (
    <Card className="gap-0 p-2 transition-shadow hover:bg-slate-500/10">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex flex-row items-center justify-start gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </CardTitle>
          <Skeleton className="h-8 w-8" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-2 p-0"></CardContent>
    </Card>
  );
}
