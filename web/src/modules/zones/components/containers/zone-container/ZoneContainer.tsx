import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleType } from "@/constants/roles";
import { RoleGuard } from "@/modules/auth/components/RoleGuard";
import type { ZoneDto } from "@/modules/zones/api/types";
import { ZoneBarcode } from "@/modules/zones/components/elements/zone-barcode";
import { ZoneSector } from "@/modules/zones/components/elements/zone-sector";
import { formatDate } from "@/utils/formatDate";
import { Edit, Trash } from "lucide-react";

interface ZoneContainerProps {
  zone: ZoneDto;
  onEdit?: (zone: ZoneDto) => void;
  onDelete?: (zone: ZoneDto) => void;
}

export function ZoneContainer({ zone, onEdit, onDelete }: ZoneContainerProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Зона {zone.title}</CardTitle>
            <RoleGuard allowedRoles={[RoleType.ADMIN]}>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit?.(zone)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Редактировать
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete?.(zone)}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Удалить
                </Button>
              </div>
            </RoleGuard>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="text-muted-foreground text-sm font-medium">
                Штрихкод
              </h4>
              <ZoneBarcode zone={zone}  />
            </div>
            <div className="space-y-2">
              <h4 className="text-muted-foreground text-sm font-medium">
                Сектор
              </h4>
              <ZoneSector zone={zone} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="text-muted-foreground text-sm font-medium">
                Дата создания
              </h4>
              <p className="text-sm">{formatDate(zone.createdAt)}</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-muted-foreground text-sm font-medium">
                Последнее обновление
              </h4>
              <p className="text-sm">{formatDate(zone.updatedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
