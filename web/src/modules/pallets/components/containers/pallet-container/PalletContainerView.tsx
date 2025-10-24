import { Container } from "@/components/shared/containers/Container";
import { Button } from "@/components/ui/button";
import type { PalletResponse } from "@/modules/pallets/api/types";
import { PalletInfo } from "@/modules/pallets/components/elements/pallet-info/PalletInfo";
import {
  PosesByPalletContainer,
  PosesByPalletContainerSkeleton,
} from "@/modules/poses/components/containers/poses-by-pallet-container";
import { CreatePosDialog } from "@/modules/poses/components/dialogs/create-pos-dialog/CreatePosDialog";
import { PosesByPalletFetcher } from "@/modules/poses/components/fetchers";

interface PalletContainerViewProps {
  pallet: PalletResponse;
  handlePosCreated: (newPosId?: string) => void;
  newPosIds?: string[];
}

export function PalletContainerView({
  pallet,
  handlePosCreated,
  newPosIds,
}: PalletContainerViewProps) {
  return (
    <div className="grid gap-2">
      <Container className="flex flex-wrap items-center justify-between gap-2">
        {" "}
        <PalletInfo pallet={pallet.data!} />
        <CreatePosDialog
          pallet={pallet.data!}
          onSuccess={handlePosCreated}
          trigger={<Button variant="outline">+ Додати позицію</Button>}
        />
      </Container>

      <PosesByPalletFetcher
        palletId={pallet.data!._id}
        ContainerComponent={PosesByPalletContainer}
        SkeletonComponent={PosesByPalletContainerSkeleton}
        newPosIds={newPosIds}
      />
    </div>
  );
}
