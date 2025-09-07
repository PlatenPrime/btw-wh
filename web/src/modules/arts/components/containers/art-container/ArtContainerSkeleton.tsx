import { Skeleton } from "@/components/ui/skeleton";
import { BtradeArtDataSkeleton } from "../../elements/btrade-art-data/BtradeArtDataSkeleton";

export function ArtContainerSkeleton() {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {/* Скелетон для изображения товара */}
        <Skeleton className="h-20 w-20 rounded-md" />

        <div className="grid">
          {/* Скелетон для названия товара */}
          <Skeleton className="mb-2 h-6 w-64" />

          {/* Используем существующий скелетон для данных Btrade */}
          <BtradeArtDataSkeleton />
        </div>
      </div>
    </section>
  );
}
