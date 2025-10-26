import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGrid } from "@/modules/arts/components/lists/arts-grid/ArtsGrid";

interface ArtsByZoneContainerProps {
  data: ArtDto[];
  total: number;
}

export function ArtsByZoneContainer({ data, total }: ArtsByZoneContainerProps) {
  return (
    <Card className="p-2 gap-2">
      <CardHeader className="p-0">
        <CardTitle className="text-xl">Артикули ({total})</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ArtsGrid arts={data} />
      </CardContent>
    </Card>
  );
}
