import { Card, CardContent } from "@/components/ui/card";
import { Barcode, LayoutGrid } from "lucide-react";
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
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Barcode className="text-muted-foreground size-4 shrink-0" aria-hidden />
            <ZoneBarcode zone={zone} className="text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <LayoutGrid className="text-muted-foreground size-4 shrink-0" aria-hidden />
            <ZoneSector zone={zone} className="text-sm" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
