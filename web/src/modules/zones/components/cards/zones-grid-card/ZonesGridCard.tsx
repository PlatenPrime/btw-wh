import { CardActionsMenu } from "@/components/shared/card-actions/CardActionsMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleType } from "@/constants/roles";
import { RoleGuard } from "@/modules/auth/components/RoleGuard";
import type { ZoneDto } from "@/modules/zones/api/types";
import { ZoneBarcode } from "@/modules/zones/components/elements/zone-barcode";
import { ZoneLink } from "@/modules/zones/components/elements/zone-link";
import { ZoneSector } from "@/modules/zones/components/elements/zone-sector";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

interface ZonesGridCardProps {
  zone: ZoneDto;
  onEdit?: (zone: ZoneDto) => void;
  onDelete?: (zone: ZoneDto) => void;
}

export function ZonesGridCard({ zone, onEdit, onDelete }: ZonesGridCardProps) {
  const actions = [
    {
      id: "edit",
      label: "Редактировать",
      icon: Edit,
      onClick: () => onEdit?.(zone),
    },
    {
      id: "delete",
      label: "Удалить",
      icon: Trash,
      variant: "destructive" as const,
      onClick: () => onDelete?.(zone),
    },
  ].filter(() => true); // Фильтрация будет в RoleGuard

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            <ZoneLink zone={zone} className="hover:underline">
              {zone.title}
            </ZoneLink>
          </CardTitle>
          <RoleGuard allowedRoles={[RoleType.ADMIN]}>
            <CardActionsMenu
              actions={actions}
              trigger={<MoreHorizontal className="h-4 w-4" />}
              size="sm"
            />
          </RoleGuard>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Штрихкод:</span>
          <ZoneBarcode zone={zone} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Сектор:</span>
          <ZoneSector zone={zone} />
        </div>
      </CardContent>
    </Card>
  );
}
