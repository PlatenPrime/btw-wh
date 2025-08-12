import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sklads, type ISklads } from "@/constants/sklad";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image";
import { Circle, Edit, Package, Trash, Warehouse } from "lucide-react";
import { DeletePosDialog, UpdatePosDialog } from "../..";
import { StatItem } from "../stat-item";

import type { IPos } from "@/modules/poses/api";
import { Link } from "react-router";

interface PosInPalletCardProps {
  pos: IPos;
  onSuccess?: () => void;
}

export function PosInPalletCardView({ pos, onSuccess }: PosInPalletCardProps) {
  return (
    <Card className="group relative justify-between gap-2 overflow-hidden p-2 transition-all duration-200 hover:shadow-md">
      {/* Header with image, title and actions */}
      <CardHeader className="flex items-start gap-3 p-3 px-0 py-0 pb-2">
        {/* Image and title section */}
        <div className="flex flex-1 items-start gap-3">
          <ArtDialogImage artikul={pos.artikul} />
          <div className="flex flex-col justify-between gap-2">
            <CardTitle className="text-base leading-tight font-semibold">
              <Link
                to={`/arts/${pos.artikul}`}
                className="hover:text-blue-800 dark:hover:text-blue-200"
              >
                {" "}
                {pos.artikul}{" "}
              </Link>
            </CardTitle>
            <span className="text-muted-foreground text-xs leading-tight">
              {pos.nameukr?.slice(10) || "Назва українською"}
            </span>
          </div>
        </div>

        {/* Actions section */}
        <div className="grid gap-2">
          <UpdatePosDialog
            pos={pos}
            trigger={
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary/10 h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
              </Button>
            }
            onSuccess={onSuccess}
          />
          <DeletePosDialog
            pos={pos}
            trigger={
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-destructive/10 hover:text-destructive h-8 w-8 p-0"
              >
                <Trash className="h-4 w-4" />
              </Button>
            }
            onSuccess={onSuccess}
          />
        </div>
      </CardHeader>

      {/* Content with metrics */}
      <CardContent className="px-0">
        <div className="grid grid-cols-3 gap-1.5">
          <StatItem icon={Circle} value={pos.quant || 0} />
          <StatItem icon={Package} value={pos.boxes || 0} />
          <StatItem
            icon={Warehouse}
            value={sklads[pos.sklad as keyof ISklads] || pos.sklad}
          />
        </div>
      </CardContent>
    </Card>
  );
}
