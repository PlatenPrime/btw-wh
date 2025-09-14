import { Container } from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";
import { BtradeArtDataSkeleton } from "../../containers/btrade-art-data-container/BtradeArtDataSkeleton";

export function ArtDetailCardSkeleton() {
  return (
    <Container className="flex items-center gap-2">
      {/* Скелетон для изображения товара */}
      <Skeleton className="h-20 w-20 rounded-md" />

      <div className="grid gap-2">
        {/* Скелетон для названия товара */}
        <Skeleton className=" h-6 w-64" />

        {/* Скелетон для зоны */}
        <div className=" flex items-center gap-1">
          <Skeleton className="h-4 w-3 rounded" />
          <Skeleton className="h-4 w-12" />
        </div>

        {/* Используем существующий скелетон для данных Btrade */}
        <BtradeArtDataSkeleton />

        <div className=" flex items-center gap-1">
          <Skeleton className="h-4 w-3 rounded" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </Container>
  );
}
