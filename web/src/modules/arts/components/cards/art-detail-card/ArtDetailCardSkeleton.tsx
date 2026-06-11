import { Card, CardContent } from "@/components/ui";
import { Skeleton } from "@/components/ui/skeleton";
import { BtradeArtDataPanelSkeleton } from "@/modules/arts/components/elements/btrade-art-data-panel";

export function ArtDetailCardSkeleton() {
  return (
    <Card className="p-0">
      <CardContent className="grid gap-2 p-2 text-sm">
        <Skeleton className="h-10 w-10 rounded-md" />

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-12" />
          </div>

          <BtradeArtDataPanelSkeleton />
        </div>
      </CardContent>
    </Card>
  );
}
