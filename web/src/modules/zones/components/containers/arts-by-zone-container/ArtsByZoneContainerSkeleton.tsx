import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArtsGridSkeleton } from "@/modules/arts/components/lists/arts-grid/ArtsGridSkeleton";

export function ArtsByZoneContainerSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Артикули</CardTitle>
      </CardHeader>
      <CardContent>
        <ArtsGridSkeleton />
      </CardContent>
    </Card>
  );
}
