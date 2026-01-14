import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDetailCard } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCard";
import { PosesByArtikulContainer } from "@/modules/arts/components/containers/poses-by-artikul-container";
import { UpdateArtLimitDialog } from "@/modules/arts/components/dialogs/update-art-limit-dialog/UpdateArtLimitDialog";
import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";
import { AsksByArtikulFetcher } from "@/modules/asks/components/fetchers/asks-by-artikul-fetcher";
import {
  AsksByArtikulContainer,
  AsksByArtikulContainerSkeleton,
} from "@/modules/asks/components/containers/asks-by-artikul-container";

interface ArtContainerViewProps {
  artData: ArtDto;
  // Update limit dialog props
  updateLimitDialogOpen: boolean;
  setUpdateLimitDialogOpen: (open: boolean) => void;
  // Create ask dialog props
  createAskDialogOpen: boolean;
  setCreateAskDialogOpen: (open: boolean) => void;
}

export function ArtContainerView({
  artData,
  updateLimitDialogOpen,
  setUpdateLimitDialogOpen,
  createAskDialogOpen,
  setCreateAskDialogOpen,
}: ArtContainerViewProps) {
  return (
    <section className="grid gap-2">
      <Wrapper>
        <ArtDetailCard artData={artData} />
      </Wrapper>
      <PosesByArtikulContainer artikul={artData.artikul} />
      <Wrapper>
      <AsksByArtikulFetcher
        artikul={artData.artikul}
        ContainerComponent={AsksByArtikulContainer}
        SkeletonComponent={AsksByArtikulContainerSkeleton}
      />
     </Wrapper>

      {/* Диалоги вне dropdown для избежания конфликта фокуса */}
      <UpdateArtLimitDialog
        artData={artData}
        open={updateLimitDialogOpen}
        onOpenChange={setUpdateLimitDialogOpen}
      />
      <CreateAskDialog
        preFilledArtikul={artData.artikul}
        open={createAskDialogOpen}
        onOpenChange={setCreateAskDialogOpen}
        showTrigger={false}
      />
    </section>
  );
}
