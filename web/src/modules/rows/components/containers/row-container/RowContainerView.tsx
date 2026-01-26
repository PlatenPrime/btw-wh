import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { CreatePalletDialog } from "@/modules/pallets/components/dialogs/create-pallet-dialog/CreatePalletDialog";
import { PalletsList } from "@/modules/pallets/components/lists/pallets-list/PalletsList";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { Grid3x3 } from "lucide-react";

interface RowContainerViewProps {
  row: RowDto;
}

export function RowContainerView({ row }: RowContainerViewProps) {
  return (
    <div className="grid gap-2">
      {/* Header */}
      <Wrapper className="flex items-start justify-between">
        <p className="flex h-full items-center gap-2">
          <Grid3x3 className="h-4 w-4" /> {row.pallets.length}
        </p>
        <CreatePalletDialog row={row} />
      </Wrapper>

      <PalletsList pallets={row.pallets} rowId={row._id} />
    </div>
  );
}
