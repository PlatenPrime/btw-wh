import { Card, CardContent } from "@/components/ui";
import type { IPallet } from "@/modules/pallets/api/types";
import { ClearPalletDialog } from "@/modules/pallets/components/dialogs/clear-pallet-dialog/ClearPalletDialog";
import { DeletePalletDialog } from "@/modules/pallets/components/dialogs/delete-pallet-dialog/DeletePalletDialog";
import { DeletePalletEmptyPosesDialog } from "@/modules/pallets/components/dialogs/delete-pallet-empty-poses-dialog/DeletePalletEmptyPosesDialog";
import { MovePalletPosesDialog } from "@/modules/pallets/components/dialogs/move-pallet-poses-dialog/MovePalletPosesDialog";
import { useNavigate } from "react-router";

interface PalletActionsProps {
  pallet: IPallet;
}

export function PalletControl({ pallet }: PalletActionsProps) {
  const navigate = useNavigate();

  const handleDelete = () => {
    navigate(`/wh/rows/${pallet.rowData.title}`);
  };

  return (
    <Card className="flex w-full p-0 lg:w-fit">
      <CardContent className="flex flex-wrap items-center justify-between gap-4 p-0">
        <ClearPalletDialog pallet={pallet} onSuccess={() => {}} />
        <DeletePalletEmptyPosesDialog pallet={pallet} onSuccess={() => {}} />
        <MovePalletPosesDialog pallet={pallet} />
        <DeletePalletDialog pallet={pallet} onSuccess={handleDelete} />
      </CardContent>
    </Card>
  );
}
