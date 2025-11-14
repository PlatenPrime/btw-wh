import { CardActionsMenu } from "@/components/shared/card-actions/CardActionsMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleType } from "@/constants/roles";
import { RoleGuard } from "@/modules/auth/components/RoleGuard";
import type { ZoneDto } from "@/modules/zones/api/types";
import { ZoneBarcode } from "@/modules/zones/components/elements/zone-barcode";
import { ZoneLink } from "@/modules/zones/components/elements/zone-link";
import { ZoneSector } from "@/modules/zones/components/elements/zone-sector";
import { Edit, Trash } from "lucide-react";

interface ZonesGridCardProps {
  zone: ZoneDto;
  onEdit?: (zone: ZoneDto) => void;
  onDelete?: (zone: ZoneDto) => void;
}

export function ZonesGridCard({ zone, onEdit, onDelete }: ZonesGridCardProps) {
  const actions = [
    {
      id: "edit",
      label: "Редагувати",
      icon: Edit,
      onClick: () => onEdit?.(zone),
    },
    {
      id: "delete",
      label: "Видалити",
      icon: Trash,
      variant: "destructive" as const,
      onClick: () => onDelete?.(zone),
    },
  ].filter(() => true); // Фільтрація буде в RoleGuard

  return (
    <Card className="gap-0 p-2 transition-shadow hover:shadow-md">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle className="">
            <ZoneLink zone={zone} className="hover:underline">
              {zone.title}
            </ZoneLink>
          </CardTitle>
          <RoleGuard allowedRoles={[RoleType.ADMIN]}>
            <CardActionsMenu
              actions={actions}
              orientation="horizontal"
              size="sm"
              align="end"
            />
          </RoleGuard>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2 p-0">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">Штрих-код:</span>
          <ZoneBarcode zone={zone} className="text-muted-foreground text-xs" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">Сектор:</span>
          <ZoneSector zone={zone} className="text-muted-foreground text-xs" />
        </div>
      </CardContent>
    </Card>
  );
}
