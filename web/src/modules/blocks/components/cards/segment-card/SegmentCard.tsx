import { CardActionsMenu } from "@/components/shared/card-actions/CardActionsMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleType } from "@/constants/roles";
import { RoleGuard } from "@/modules/auth/components/RoleGuard";
import { Link } from "react-router";
import type { SegmentDto } from "@/modules/blocks/api/types";
import { useZonesBySegmentQuery } from "@/modules/blocks/api/hooks/queries/useZonesBySegmentQuery";
import { Trash } from "lucide-react";

interface SegmentCardProps {
  segment: SegmentDto;
  blockId: string;
  onDelete?: (segment: SegmentDto) => void;
}

export function SegmentCard({ segment, blockId, onDelete }: SegmentCardProps) {
  const { data: zonesData } = useZonesBySegmentQuery({
    segId: segment._id,
    enabled: true,
  });

  const zones = zonesData?.data ?? [];
  const zoneTitles = zones.map((zone) => zone.title).join(", ");

  const actions = [
    {
      id: "delete",
      label: "Видалити",
      icon: Trash,
      variant: "destructive" as const,
      onClick: () => onDelete?.(segment),
    },
  ].filter(() => true);

  return (
    <Card className="gap-0 p-2 transition-shadow hover:shadow-md">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle>
            <Link
              to={`/wh/blocks/${blockId}/segs/${segment._id}`}
              className="hover:underline"
            >
              Сегмент #{segment.order}
            </Link>
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
        <div className="flex items-center justify-start">
          <span className="text-muted-foreground text-xs">#</span>
          <span className="text-muted-foreground text-xs">{segment.order}</span>
        </div>
        {zones.length > 0 && (
          <div className="grid gap-1">
            <span className="text-muted-foreground text-xs">Зони:</span>
            <span className="text-xs">{zoneTitles}</span>
          </div>
        )}
        {zones.length === 0 && (
          <span className="text-muted-foreground text-xs">Немає зон</span>
        )}
      </CardContent>
    </Card>
  );
}

