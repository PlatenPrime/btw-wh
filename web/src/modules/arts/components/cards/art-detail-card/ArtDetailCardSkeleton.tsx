import { Card, CardContent } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataSkeleton.tsx";

export function ArtDetailCardSkeleton() {
  return (
    <Card className="p-0">
      <CardContent className="grid gap-2 p-2 text-sm">
        {/* Скелетон для изображения товара */}
        <Skeleton className="h-10 w-10 rounded-md" />

        <div className="grid gap-2">
          {/* Скелетон для зоны */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Скелетон для лимита */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-12" />
          </div>

          {/* Используем существующий скелетон для данных Btrade */}
          <BtradeArtDataSkeleton />
        </div>
      </CardContent>
    </Card>
  );
}
