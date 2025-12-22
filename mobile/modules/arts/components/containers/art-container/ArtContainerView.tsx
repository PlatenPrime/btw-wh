import { View, ScrollView, RefreshControl } from "react-native";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDetailCard } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCard";
import { UpdateArtLimitDialog } from "@/modules/arts/components/dialogs/update-art-limit-dialog/UpdateArtLimitDialog";
import { ArtPosesByArtikulContainer } from "@/modules/arts/components/containers/poses-by-artikul-container/ArtPosesByArtikulContainer";

interface ArtContainerViewProps {
  artData: ArtDto;
  updateLimitDialogOpen: boolean;
  setUpdateLimitDialogOpen: (open: boolean) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ArtContainerView({
  artData,
  updateLimitDialogOpen,
  setUpdateLimitDialogOpen,
  refreshing = false,
  onRefresh,
}: ArtContainerViewProps) {
  return (
    <>
      <ScrollView
        className="flex-1"
        contentContainerClassName="p-4 gap-4"
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
      >
        <ArtDetailCard artData={artData} />
        <ArtPosesByArtikulContainer artikul={artData.artikul} />
      </ScrollView>

      <UpdateArtLimitDialog
        artData={artData}
        open={updateLimitDialogOpen}
        onOpenChange={setUpdateLimitDialogOpen}
      />
    </>
  );
}
