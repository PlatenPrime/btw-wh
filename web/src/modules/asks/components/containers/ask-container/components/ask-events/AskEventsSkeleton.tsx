import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AskEventsSkeleton() {
  return (
    <Card className="p-1">
      <CardContent className="grid gap-2">
        <Skeleton className="h-4 w-32" />
        <div className="grid gap-2 sm:grid-cols-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
        <div className="grid gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-md border border-slate-200 px-3 py-2"
            >
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="mt-2 h-3 w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

