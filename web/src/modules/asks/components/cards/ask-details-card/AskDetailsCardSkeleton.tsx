import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataSkeleton";
import { ArtZoneSkeleton } from "@/modules/arts/components/elements/art-zone/ArtZoneSkeleton";

export function AskDetailsCardSkeleton() {
  return (
    <Card className="w-full p-0">
      <CardContent className="flex flex-row items-start gap-2 p-2">
        {/* Скелетон для AskImageStatus */}
        <Skeleton className="h-16 w-16 rounded-md" />

        <div className="grid gap-2 text-sm">
          {/* Скелетон для ArtNameukr */}
          <Skeleton className="h-4 w-48" />

          {/* Скелетон для AskQuant */}
          <Skeleton className="h-4 w-20" />

          {/* Скелетон для AskCom */}
          <Skeleton className="h-4 w-32" />

          {/* Скелетон для UserAvatarName */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Скелетон для CalendarDate */}
          <Skeleton className="h-4 w-28" />

          {/* Скелетон для BtradeArtDataFetcher */}
          <BtradeArtDataSkeleton />

          {/* Скелетон для ArtFetcher */}
          <ArtZoneSkeleton />
        </div>
      </CardContent>
    </Card>
  );
}
