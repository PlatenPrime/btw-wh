import { Card, CardContent } from "@/components/ui";
import type { IPallet } from "@/modules/pallets/api/types";
import { ClearPalletDialog } from "@/modules/pallets/components/dialogs/clear-pallet-dialog/ClearPalletDialog";
import { DeletePalletDialog } from "@/modules/pallets/components/dialogs/delete-pallet-dialog/DeletePalletDialog";
import { MovePalletPosesDialog } from "@/modules/pallets/components/dialogs/move-pallet-poses-dialog/MovePalletPosesDialog";
import { useNavigate } from "react-router";

interface PalletActionsProps {
  pallet: IPallet;
}

export function PalletActions({ pallet }: PalletActionsProps) {
  const navigate = useNavigate();

  const handleDelete = () => {
    navigate(`/wh/rows/${pallet.rowData.title}`);
  };

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <DeletePalletDialog pallet={pallet} onSuccess={handleDelete} />
        <ClearPalletDialog pallet={pallet} onSuccess={() => {}} />
        <MovePalletPosesDialog pallet={pallet} />
      </CardContent>
    </Card>
  );
}
