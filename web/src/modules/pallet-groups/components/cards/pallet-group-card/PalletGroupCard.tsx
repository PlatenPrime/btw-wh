import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
          <CardTitle className="flex flex-row items-center justify-start gap-2">
            <div className="bg-accent/50 flex h-8 w-8 items-center justify-center rounded-full p-2">
              <span className="text-foreground text-xs">{group.order}</span>
            </div>
            <Link
              to={`/wh/pallet-groups/${group.id}`}
              className="hover:underline"
            >
              {group.title}
            </Link>
          </CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
}
