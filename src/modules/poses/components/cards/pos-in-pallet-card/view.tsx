import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image";
import { Edit, MessageCircle, Trash, Warehouse } from "lucide-react";
import { DeletePosDialog, UpdatePosDialog } from "../..";
import {sklads, type ISklads} from "@/constants/sklad";

import type { IPos } from "@/modules/poses/api";

interface PosInPalletCardProps {
  pos: IPos;
  onSuccess?: () => void;
}

export function PosInPalletCardView({ pos, onSuccess }: PosInPalletCardProps) {
  return (
    <Card className="p-2">
      <CardHeader className="flex flex-col sm:flex-row  items-center justify-start p-0 pb-2">
        <ArtDialogImage artikul={pos.artikul} />
        <CardTitle className="grid w-full gap-2">
          <span className="text-center font-semibold">{pos.artikul}</span>
          <span className="text-muted-foreground text-center text-sm font-normal">
            {pos.nameukr || "Назва українською"}
          </span>
        </CardTitle>
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
          <UpdatePosDialog
            pos={pos}
            trigger={
              <Button variant="outline" size="sm">
                <Edit className=" h-4 w-4" />
               
              </Button>
            }
            onSuccess={onSuccess}
          />
          <DeletePosDialog
            pos={pos}
            trigger={
              <Button variant="outline" size="sm">
                <Trash className=" h-4 w-4" />
                
              </Button>
            }
            onSuccess={onSuccess}
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium"><MessageCircle /></span>
          <span className="font-semibold">{pos.quant || 0}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium"><Warehouse className="h-4 w-4" /></span>
          <span className="font-semibold">{pos.boxes || 0}</span>
        </div>

        {pos.sklad && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium"><Warehouse className="h-4 w-4" /></span>
            <span className="text-muted-foreground text-sm">{sklads[pos.sklad as keyof ISklads] || pos.sklad}</span>
          </div>
        )}

         {pos.date && (
          <div className="pt-2">
            <p className="text-muted-foreground text-xs">{pos.date}</p>
          </div>
        )}

        {pos.comment && (
          <div className="pt-2">
            <p className="text-muted-foreground text-xs">{pos.comment}</p>
          </div>
        )}

        
      </CardContent>
    </Card>
  );
}
