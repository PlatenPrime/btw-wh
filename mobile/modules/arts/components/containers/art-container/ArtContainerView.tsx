import { View, ScrollView } from "react-native";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDetailCard } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCard";
import { UpdateArtLimitDialog } from "@/modules/arts/components/dialogs/update-art-limit-dialog/UpdateArtLimitDialog";

interface ArtContainerViewProps {
  artData: ArtDto;
  updateLimitDialogOpen: boolean;
  setUpdateLimitDialogOpen: (open: boolean) => void;
}

export function ArtContainerView({
  artData,
  updateLimitDialogOpen,
  setUpdateLimitDialogOpen,
}: ArtContainerViewProps) {
  return (
    <>
      <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">
        <ArtDetailCard artData={artData} />
        {/* PosesByArtikulContainer будет добавлен позже */}
      </ScrollView>

      <UpdateArtLimitDialog
        artData={artData}
        open={updateLimitDialogOpen}
        onOpenChange={setUpdateLimitDialogOpen}
      />
    </>
  );
}
