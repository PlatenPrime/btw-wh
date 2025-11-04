import { Container } from "@/components/shared/containers/Container";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PalletResponse } from "@/modules/pallets/api/types";
import { PalletInfo } from "@/modules/pallets/components/elements/pallet-info/PalletInfo";
import type { GetPosesByPalletIdParams } from "@/modules/poses/api/services/queries/getPosesByPalletId";
import {
  PosesByPalletContainer,
  PosesByPalletContainerSkeleton,
} from "@/modules/poses/components/containers/poses-by-pallet-container";
import { CreatePosDialog } from "@/modules/poses/components/dialogs/create-pos-dialog/CreatePosDialog";
import { PosesByPalletFetcher } from "@/modules/poses/components/fetchers";

interface PalletContainerViewProps {
  pallet: PalletResponse;
  handlePosCreated: () => void;
  sortParams: GetPosesByPalletIdParams;
  onSortParamsChange: (params: GetPosesByPalletIdParams) => void;
}

export function PalletContainerView({
  pallet,
  handlePosCreated,
  sortParams,
  onSortParamsChange,
}: PalletContainerViewProps) {
  const handleSortByChange = (value: "artikul" | "createdAt") => {
    onSortParamsChange({
      ...sortParams,
      sortBy: value,
    });
  };

  const handleSortOrderChange = (value: "asc" | "desc") => {
    onSortParamsChange({
      ...sortParams,
      sortOrder: value,
    });
  };

  return (
    <div className="grid gap-2">
      <Container className="grid gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={sortParams.sortBy || "createdAt"}
            onValueChange={handleSortByChange}
          >
            <SelectTrigger className="w-full lg:w-fit">
              <SelectValue placeholder="Сортувати по" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="artikul">Артикул</SelectItem>
              <SelectItem value="createdAt">Дата створення</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={sortParams.sortOrder || "desc"}
            onValueChange={handleSortOrderChange}
          >
            <SelectTrigger className="w-full lg:w-fit">
              <SelectValue placeholder="Порядок" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">За зростанням</SelectItem>
              <SelectItem value="desc">За спаданням</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between gap-2">
          <PalletInfo pallet={pallet.data!} />

          <CreatePosDialog
            pallet={pallet.data!}
            onSuccess={handlePosCreated}
            trigger={<Button variant="outline">+ Додати позицію</Button>}
          />
        </div>
      </Container>

      <PosesByPalletFetcher
        palletId={pallet.data!._id}
        ContainerComponent={PosesByPalletContainer}
        SkeletonComponent={PosesByPalletContainerSkeleton}
        sortParams={sortParams}
      />
    </div>
  );
}
