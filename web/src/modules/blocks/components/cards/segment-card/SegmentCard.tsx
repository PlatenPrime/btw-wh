import { CardActionsMenu } from "@/components/shared/card-actions/CardActionsMenu";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleType } from "@/constants/roles";
import { RoleGuard } from "@/modules/auth/components/RoleGuard";
import type { SegmentDto } from "@/modules/blocks/api/types";
import { Trash } from "lucide-react";
import { Link } from "react-router";

interface SegmentCardProps {
  segment: SegmentDto;
  blockId: string;
  onDelete?: (segment: SegmentDto) => void;
}

export function SegmentCard({ segment, blockId, onDelete }: SegmentCardProps) {
  const zoneTitles = segment.zones.map((zone) => zone.title).join(", ");

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
          <CardTitle className="flex flex-row items-center justify-start gap-2">
            <Link
              to={`/wh/blocks/${blockId}/segs/${segment._id}`}
              className="flex flex-row items-center justify-start gap-2 hover:underline"
            >
              <div className="bg-accent/50 flex h-8 w-8 items-center justify-center rounded-full p-2">
                <span className="text-foreground text-xs">{segment.order}</span>
              </div>
              {segment.zones.length > 0 && (
                <div className="grid gap-1">
                  <span className="">{zoneTitles}</span>
                </div>
              )}
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
    </Card>
  );
}
