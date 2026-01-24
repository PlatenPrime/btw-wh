import { CardActionsMenu } from "@/components/shared/card-actions/CardActionsMenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoleType } from "@/constants/roles";
import { RoleGuard } from "@/modules/auth/components/RoleGuard";
import type { BlockDto } from "@/modules/blocks/api/types";
import { Trash } from "lucide-react";
import { Link } from "react-router";

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
    <Card className="gap-0 p-2 transition-shadow ">
      <CardHeader className="p-0 ">
        <div className="flex items-center justify-between">
          <CardTitle className="flex flex-row items-center justify-start gap-2">
            <div className="flex items-center justify-center bg-accent/50 p-2 rounded-full w-8 h-8 ">
              <span className="text-foreground text-xs ">
                {block.order}
              </span>
            </div>

            <Link to={`/wh/blocks/${block._id}`} className="hover:underline">
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
      <CardContent className="grid gap-2 p-0"></CardContent>
    </Card>
  );
}
