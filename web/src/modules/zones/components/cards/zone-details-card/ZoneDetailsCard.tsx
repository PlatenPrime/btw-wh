import { Card, CardContent } from "@/components/ui/card";
import type { ZoneDto } from "@/modules/zones/api/types";
import { ZoneBarcode } from "@/modules/zones/components/elements/zone-barcode";
import { ZoneSector } from "@/modules/zones/components/elements/zone-sector";

interface ZoneDetailsCardProps {
  zone: ZoneDto;
}

export function ZoneDetailsCard({ zone }: ZoneDetailsCardProps) {
  return (
    <Card className="p-2" >
      <CardContent className="grid gap-2 p-0">
        <div className="text-lg font-semibold">Зона: {zone.title}</div>
        <div className="grid  ">
          <div className="flex items-center gap-2">
            <div className=" text-sm">Штрих-код: </div>
            <ZoneBarcode zone={zone} className="text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <div className=" text-sm">Сектор:</div>
            <ZoneSector zone={zone} className="text-sm" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
