import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDetailCard } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCard";
import { ArtPosesByArtikulContainer } from "@/modules/arts/components/containers/poses-by-artikul-container/ArtPosesByArtikulContainer";
import { UpdateArtLimitDialog } from "@/modules/arts/components/dialogs/update-art-limit-dialog/UpdateArtLimitDialog";
import { AsksByArtikulContainer } from "@/modules/asks/components/containers/asks-by-artikul-container/AsksByArtikulContainer";
import { AsksByArtikulContainerSkeleton } from "@/modules/asks/components/containers/asks-by-artikul-container/AsksByArtikulContainerSkeleton";
import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";
import { AsksByArtikulFetcher } from "@/modules/asks/components/fetchers/asks-by-artikul-fetcher/AsksByArtikulFetcher";
import { RefreshControl, ScrollView } from "react-native";

interface ArtContainerViewProps {
  artData: ArtDto;
  updateLimitDialogOpen: boolean;
  setUpdateLimitDialogOpen: (open: boolean) => void;
  createAskDialogOpen: boolean;
  setCreateAskDialogOpen: (open: boolean) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ArtContainerView({
  artData,
  updateLimitDialogOpen,
  setUpdateLimitDialogOpen,
  createAskDialogOpen,
  setCreateAskDialogOpen,
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
        <AsksByArtikulFetcher
          artikul={artData.artikul}
          ContainerComponent={AsksByArtikulContainer}
          SkeletonComponent={AsksByArtikulContainerSkeleton}
        />
      </ScrollView>

      <UpdateArtLimitDialog
        artData={artData}
        open={updateLimitDialogOpen}
        onOpenChange={setUpdateLimitDialogOpen}
      />
      <CreateAskDialog
        preFilledArtikul={artData.artikul}
        open={createAskDialogOpen}
        onOpenChange={setCreateAskDialogOpen}
        onSuccess={() => setCreateAskDialogOpen(false)}
      />
    </>
  );
}
