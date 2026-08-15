import { IconWell } from "@/components/shared/elements";
import { typography } from "@/lib/typography";
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
    <Card className="p-2">
      <CardContent className="grid gap-2 p-0">
        <div className={typography.detailTitle}>Зона: {zone.title}</div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <IconWell icon={Barcode} tone="warning" size="sm" />
            <ZoneBarcode zone={zone} className={typography.body} />
          </div>
          <div className="flex items-center gap-2">
            <IconWell icon={LayoutGrid} tone="edit" size="sm" />
            <ZoneSector zone={zone} className={typography.body} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
