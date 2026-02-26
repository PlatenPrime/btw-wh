import { CardActionsMenu } from "@/components/shared/card-actions/CardActionsMenu";
import { AnalogImageLink } from "@/components/shared/analog-image-link/AnalogImageLink";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleType } from "@/constants/roles";
import { RoleGuard } from "@/modules/auth/components/RoleGuard";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { AnalogDto } from "@/modules/analogs/api/types";
import { Edit, Trash } from "lucide-react";
import { useMemo } from "react";

interface AnalogGridCardProps {
  analog: AnalogDto;
  onEdit?: (analog: AnalogDto) => void;
  onDelete?: (analog: AnalogDto) => void;
}

export function AnalogGridCard({
  analog,
  onEdit,
  onDelete,
}: AnalogGridCardProps) {
  const { hasAnyRole } = useAuth();
  const canEdit = hasAnyRole([RoleType.ADMIN, RoleType.PRIME]);
  const canDelete = hasAnyRole([RoleType.PRIME]);

  const actions = useMemo(
    () => [
      ...(canEdit
        ? [
            {
              id: "edit",
              label: "Редагувати",
              icon: Edit,
              onClick: () => onEdit?.(analog),
            },
          ]
        : []),
      ...(canDelete
        ? [
            {
              id: "delete",
              label: "Видалити",
              icon: Trash,
              variant: "destructive" as const,
              onClick: () => onDelete?.(analog),
            },
          ]
        : []),
    ],
    [analog, canEdit, canDelete, onEdit, onDelete],
  );

  return (
    <Card className="gap-0 p-2 transition-shadow hover:shadow-md">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-muted-foreground truncate text-xs">
            {analog.konkName} / {analog.prodName}
          </CardTitle>
          <RoleGuard
            allowedRoles={[RoleType.ADMIN, RoleType.PRIME]}
            fallback={null}
          >
            <CardActionsMenu
              actions={actions}
              orientation="horizontal"
              size="sm"
              align="end"
            />
          </RoleGuard>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2 p-0 pt-2">
        <AnalogImageLink
          url={analog.url}
          title={analog.title}
          nameukr={analog.nameukr}
          artikul={analog.artikul || undefined}
          imageUrl={analog.imageUrl}
        />
      </CardContent>
    </Card>
  );
}
