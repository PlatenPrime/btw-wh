import { CardActionsMenu } from "@/components/shared/actions/card-actions";
import { ListRowCard } from "@/components/shared/cards";
import { IconWell } from "@/components/shared/elements";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleType } from "@/constants/roles";
import { RoleGuard } from "@/modules/auth/components/elements/RoleGuard";
import { typography } from "@/lib/typography";
import type { ZoneDto } from "@/modules/zones/api/types";
import { ZoneBarcode } from "@/modules/zones/components/elements/zone-barcode";
import { ZoneLink } from "@/modules/zones/components/elements/zone-link";
import { ZoneSector } from "@/modules/zones/components/elements/zone-sector";
import { Barcode, Edit, LayoutGrid, Trash } from "lucide-react";

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
    <ListRowCard>
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle size="sm">
            <ZoneLink zone={zone} className={typography.listTitleCompact}>
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
        <div className="flex items-center gap-2">
          <IconWell icon={Barcode} tone="warning" size="sm" />
          <ZoneBarcode zone={zone} className={typography.listSubtitle} />
        </div>
        <div className="flex items-center gap-2">
          <IconWell icon={LayoutGrid} tone="edit" size="sm" />
          <ZoneSector zone={zone} className={typography.listSubtitle} />
        </div>
      </CardContent>
    </ListRowCard>
  );
}
