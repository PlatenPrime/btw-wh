import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AskControlButtonsSkeleton() {
  return (
    <Card className="p-0">
      <CardContent className="flex h-full flex-col justify-between gap-1 p-1">
        {/* Скелетон для AskCompleteButton */}
        <Skeleton className="h-8 w-8 rounded-md" />

        {/* Скелетон для AskRejectButton */}
        <Skeleton className="h-8 w-8 rounded-md" />

        {/* Скелетон для AskDeleteButton */}
        <Skeleton className="h-8 w-8 rounded-md" />
      </CardContent>
    </Card>
  );
}
