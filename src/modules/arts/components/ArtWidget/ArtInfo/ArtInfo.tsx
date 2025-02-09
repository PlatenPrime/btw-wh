import { Card } from "@/components/ui/card";
import { IArtInfo } from "@/modules/arts/types/IArtInfo";

interface ArtInfoProps {
  artInfo: IArtInfo;
}

export function ArtInfo({ artInfo }: ArtInfoProps) {
  return (
    <Card className="grid gap-2 ">
      <p className="flex gap-2">Артикул: {artInfo.artikul}</p>
    </Card>
  );
}
