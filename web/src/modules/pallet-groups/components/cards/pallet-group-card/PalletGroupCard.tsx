import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { typography } from "@/lib/typography";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import { Link } from "react-router";

interface PalletGroupCardProps {
  group: PalletGroupDto;
}

export function PalletGroupCard({ group }: PalletGroupCardProps) {
  return (
    <Card className="p-2 transition-shadow">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle size="sm" className="flex flex-row items-center justify-start gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/50 p-2">
              <span className={typography.caption}>{group.order}</span>
            </div>
            <Link
              to={`/wh/pallet-groups/${group.id}`}
              className={typography.listTitleCompact}
            >
              {group.title}
            </Link>
          </CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
}
