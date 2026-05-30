import { DetailPanelCard } from "@/components/shared/cards";

import { CardContent } from "@/components/ui/card";

import type { AskDto } from "@/modules/asks/api/types/dto";

import { AskDetailsLocationRow } from "@/modules/asks/components/cards/ask-details-card/components/ask-details-location-row/AskDetailsLocationRow";

import { AskDetailsPanelsSection } from "@/modules/asks/components/cards/ask-details-card/components/ask-details-panels-section/AskDetailsPanelsSection";

import { AskDetailsProductHeader } from "@/modules/asks/components/cards/ask-details-card/components/ask-details-product-header/AskDetailsProductHeader";

import { AskDetailsRequesterRow } from "@/modules/asks/components/cards/ask-details-card/components/ask-details-requester-row/AskDetailsRequesterRow";

interface AskDetailsCardViewProps {
  askData: AskDto;
}

export function AskDetailsCardView({ askData }: AskDetailsCardViewProps) {
  return (
    <DetailPanelCard className="gap-0 overflow-hidden p-0">
      <CardContent className="grid gap-0 p-0">
        <AskDetailsProductHeader
          artikul={askData.artikul}
          nameukr={askData.nameukr}
          status={askData.status}
        />

        <AskDetailsRequesterRow
          fullname={askData.askerData?.fullname}
          photo={askData.askerData?.photo}
          createdAt={askData.createdAt}
        />

        <AskDetailsLocationRow sklad={askData.sklad} zone={askData.zone} />

        <AskDetailsPanelsSection
          artikul={askData.artikul}
          quant={askData.quant}
          com={askData.com}
        />
      </CardContent>
    </DetailPanelCard>
  );
}
