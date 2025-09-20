import { Card, CardContent } from "@/components/ui/card";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";
import { UpdateArtLimitDialog } from "../../dialogs/update-art-limit-dialog/UpdateArtLimitDialog";

export function ArtControlButtons({ artData }: { artData: ArtDto }) {
  return (
    <Card className="p-0">
      <CardContent className="flex h-full flex-col justify-between gap-1 p-1">
        <UpdateArtLimitDialog artData={artData} />
        <CreateAskDialog preFilledArtikul={artData.artikul} />
      </CardContent>
    </Card>
  );
}
