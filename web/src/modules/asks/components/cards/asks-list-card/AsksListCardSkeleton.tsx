import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AsksListCardSkeleton() {
  return (
    <Card className="grid gap-2 p-2">
      {/* Скелетон для ArtikulImageLink (изображение + статус вместе) */}
      <div className="flex items-start gap-3">
        <Skeleton className="h-16 w-16 rounded-md" />
        <div className="grid gap-1">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-20 rounded-md" />
          </div>
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="grid gap-2 pl-12">
        {/* Скелетон для AskQuant */}
        <Skeleton className="h-4 w-20" />
        {/* Скелетон для AskCom */}
        <Skeleton className="h-4 w-32" />
        {/* Скелетон для AskSklad */}
        <Skeleton className="h-4 w-24" />
        {/* Скелетон для UserAvatarName */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        {/* Скелетон для CalendarDate */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </Card>
  );
}
