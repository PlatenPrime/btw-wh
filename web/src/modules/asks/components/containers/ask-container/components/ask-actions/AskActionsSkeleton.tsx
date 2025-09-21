import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AskActionsSkeleton() {
  return (
    <Card className="p-1">
      <CardContent className="flex flex-col gap-2">
        {/* Скелетон для списка действий */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-start gap-2">
            <Skeleton className="h-4 w-4 shrink-0" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
