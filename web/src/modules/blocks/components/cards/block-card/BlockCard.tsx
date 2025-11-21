import { CardActionsMenu } from "@/components/shared/card-actions/CardActionsMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleType } from "@/constants/roles";
import { RoleGuard } from "@/modules/auth/components/RoleGuard";
import { Link } from "react-router";
import type { BlockDto } from "@/modules/blocks/api/types";
import { Trash } from "lucide-react";

interface BlockCardProps {
  block: BlockDto;
  onDelete?: (block: BlockDto) => void;
}

export function BlockCard({ block, onDelete }: BlockCardProps) {
  const actions = [
    {
      id: "delete",
      label: "Видалити",
      icon: Trash,
      variant: "destructive" as const,
      onClick: () => onDelete?.(block),
    },
  ].filter(() => true);

  return (
    <Card className="gap-0 p-2 transition-shadow hover:shadow-md">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle>
            <Link
              to={`/wh/blocks/${block._id}`}
              className="hover:underline"
            >
              {block.title}
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
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-xs">Порядок:</span>
          <span className="text-muted-foreground text-xs">{block.order}</span>
        </div>
      </CardContent>
    </Card>
  );
}

