import { Skeleton } from "@/components/ui/skeleton";
import { BtradeArtDataSkeleton } from "../../containers/btrade-art-data-container/BtradeArtDataSkeleton";

export function ArtDetailCardSkeleton() {
  return (
    <div className="flex items-center gap-2">
      {/* Скелетон для изображения товара */}
      <Skeleton className="h-20 w-20 rounded-md" />

      <div className="grid">
        {/* Скелетон для названия товара */}
        <Skeleton className="mb-2 h-6 w-64" />

        {/* Скелетон для зоны */}
        <div className="mb-2 flex items-center gap-1">
          <Skeleton className="h-3 w-3 rounded" />
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Используем существующий скелетон для данных Btrade */}
        <BtradeArtDataSkeleton />
      </div>
    </div>
  );
}
