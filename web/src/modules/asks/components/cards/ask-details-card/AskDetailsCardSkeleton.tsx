import { DetailPanelCard } from "@/components/shared/cards";
import { CardContent } from "@/components/ui/card";
import { AskDetailsLocationRowSkeleton } from "@/modules/asks/components/cards/ask-details-card/components/ask-details-location-row/AskDetailsLocationRowSkeleton";
import { AskDetailsPanelsSectionSkeleton } from "@/modules/asks/components/cards/ask-details-card/components/ask-details-panels-section/AskDetailsPanelsSectionSkeleton";
import { AskDetailsProductHeaderSkeleton } from "@/modules/asks/components/cards/ask-details-card/components/ask-details-product-header/AskDetailsProductHeaderSkeleton";
import { AskDetailsRequesterRowSkeleton } from "@/modules/asks/components/cards/ask-details-card/components/ask-details-requester-row/AskDetailsRequesterRowSkeleton";

export function AskDetailsCardSkeleton() {
  return (
    <DetailPanelCard className="gap-0 overflow-hidden p-0">
      <CardContent className="grid gap-0 p-0">
        <AskDetailsProductHeaderSkeleton />
        <AskDetailsRequesterRowSkeleton />
        <AskDetailsLocationRowSkeleton />
        <AskDetailsPanelsSectionSkeleton />
      </CardContent>
    </DetailPanelCard>
  );
}
