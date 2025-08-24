import { Button } from "@/components/ui/button";
import type { IPallet } from "@/modules/pallets/api/types";
import { PalletInfo } from "@/modules/pallets/components/elements/pallet-info/PalletInfo";
import { PosesInPalletList } from "@/modules/poses/components/containers/poses-in-pallet-list/PosesInPalletList";
import { CreatePosDialog } from "@/modules/poses/components/dialogs/create-pos-dialog/CreatePosDialog";
import { useNavigate } from "react-router";
import { DeletePalletDialog } from "../../dialogs/delete-pallet-dialog/DeletePalletDialog";
import { ClearPalletDialog } from "../../dialogs/clear-pallet-dialog/ClearPalletDialog";

interface PalletDetailViewProps {
  pallet: IPallet;
  onPosCreated?: () => void;
}

export function PalletDetailView({
  pallet,
  onPosCreated,
}: PalletDetailViewProps) {
  const navigate = useNavigate();

  const handleDelete = () => {
    navigate(`/wh/rows/${pallet.rowData.title}`);
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <PalletInfo pallet={pallet} />

        <CreatePosDialog
          pallet={pallet}
          onSuccess={onPosCreated}
          trigger={<Button variant="outline">Додати позицію</Button>}
        />
        <div>
          <DeletePalletDialog pallet={pallet} onSuccess={handleDelete} />
          <ClearPalletDialog pallet={pallet} onSuccess={()=> {}} />
        </div>
      </div>
      <PosesInPalletList poses={pallet.poses} />
    </div>
  );
}
