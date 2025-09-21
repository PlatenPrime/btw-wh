import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ArtControlButtonsSkeleton() {
  return (
    <Card className="p-0">
      <CardContent className="flex h-full flex-col justify-between gap-1 p-1">
        {/* Скелетон для UpdateArtLimitDialog кнопки */}
        <Skeleton className="h-8 w-8 rounded-md" />

        {/* Скелетон для CreateAskDialog кнопки */}
        <Skeleton className="h-8 w-8 rounded-md" />
      </CardContent>
    </Card>
  );
}
