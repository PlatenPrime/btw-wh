import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sklads, type ISklads } from "@/constants/sklad";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { Circle, Package, Warehouse } from "lucide-react";

import { PosInfoItem } from "./PosInfoItem";

import { DeleteTrigger } from "@/components/triggers/delete-trigger.tsx/DeleteTrigger";
import { EditTrigger } from "@/components/triggers/edit-trigger/EditTrigger";
import type { IPos } from "@/modules/poses/api/types";
import { Link } from "react-router";
import { DeletePosDialog } from "@/modules/poses/components/dialogs/delete-pos-dialog/DeletePosDialog";
import { UpdatePosDialog } from "@/modules/poses/components/dialogs/update-pos-dialog/UpdatePosDialog";

interface PosInPalletCardProps {
  pos: IPos;
  onSuccess?: () => void;
}

export function PosInPalletCardView({ pos, onSuccess }: PosInPalletCardProps) {
  return (
    <Card className="group hover:bg-muted relative justify-between gap-2 overflow-hidden p-2 transition-all duration-200 hover:shadow-md">
      {/* Header with image, title and actions */}
      <CardHeader className="flex items-start gap-3 p-3 px-0 py-0 pb-2">
        {/* Image and title section */}
        <div className="flex flex-1 items-start gap-3">
          <ArtDialogImage artikul={pos.artikul} />
          <div className="flex flex-col justify-between gap-2">
            <CardTitle className="text-base leading-tight font-semibold">
              <Link
                to={`/arts/${pos.artikul}`}
                className="transition-colors duration-300 ease-in-out hover:text-blue-800 dark:hover:text-blue-200"
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
        <div className="grid gap-0">
          <UpdatePosDialog
            pos={pos}
            trigger={<EditTrigger />}
            onSuccess={onSuccess}
          />
          <DeletePosDialog
            pos={pos}
            trigger={<DeleteTrigger />}
            onSuccess={onSuccess}
          />
        </div>
      </CardHeader>

      {/* Content with metrics */}
      <CardContent className="px-0">
        <div className="grid grid-cols-3 gap-1.5">
          <PosInfoItem icon={Circle} value={pos.quant || 0} />
          <PosInfoItem icon={Package} value={pos.boxes || 0} />
          <PosInfoItem
            icon={Warehouse}
            value={sklads[pos.sklad as keyof ISklads] || pos.sklad}
          />
        </div>
      </CardContent>
    </Card>
  );
}
