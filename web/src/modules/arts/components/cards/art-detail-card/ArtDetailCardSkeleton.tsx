import { Card, CardContent } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataSkeleton.tsx";

export function ArtDetailCardSkeleton() {
  return (
    <Card className="p-0">
      <CardContent className="flex items-start gap-2 p-1 text-sm">
        {/* Скелетон для изображения товара */}
        <Skeleton className="h-10 w-10 rounded-md" />

        <div className="grid gap-1">
          {/* Скелетон для названия товара */}
          <Skeleton className="h-4 w-64" />

          {/* Скелетон для зоны и лимита */}
          <div className="grid gap-1">
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-3 rounded" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-3 rounded" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>

          {/* Используем существующий скелетон для данных Btrade */}
          <BtradeArtDataSkeleton />
        </div>
      </CardContent>
    </Card>
  );
}
