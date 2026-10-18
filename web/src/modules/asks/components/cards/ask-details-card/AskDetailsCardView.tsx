import { DetailPanelCard } from "@/components/shared/cards";
import { typography } from "@/lib/typography";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskDetailsMetaPanel } from "@/modules/asks/components/cards/ask-details-card/components/ask-details-meta-panel/AskDetailsMetaPanel";
import { AskDetailsProductHeader } from "@/modules/asks/components/cards/ask-details-card/components/ask-details-product-header/AskDetailsProductHeader";
import { AskDetailsRequesterRow } from "@/modules/asks/components/cards/ask-details-card/components/ask-details-requester-row/AskDetailsRequesterRow";
import { BtradeArtDataPanel } from "@/modules/arts/components/elements/btrade-art-data-panel";

interface AskDetailsCardViewProps {
  askData: AskDto;
}

function AskDetailSectionLabel({ children }: { children: string }) {
  return <span className={typography.sectionLabel}>{children}</span>;
}

export function AskDetailsCardView({ askData }: AskDetailsCardViewProps) {
  return (
    <DetailPanelCard className="gap-0 overflow-hidden p-0">
      <section className="grid min-w-0 gap-3 border-b border-border p-4 sm:p-5">
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
      </section>

      <div className="grid sm:grid-cols-2 sm:items-stretch">
        <section className="grid min-w-0 gap-3 self-start border-border p-4 sm:border-r sm:p-5">
          <AskDetailsMetaPanel
            sklad={askData.sklad}
            zone={askData.zone}
            quant={askData.quant}
            com={askData.com}
          />
        </section>

        <section className="grid min-w-0 gap-3 self-start border-t border-border p-4 sm:border-t-0 sm:p-5">
          <AskDetailSectionLabel>Sharik.ua</AskDetailSectionLabel>
          <BtradeArtDataPanel artikul={askData.artikul} variant="embedded" />
        </section>
      </div>
    </DetailPanelCard>
  );
}
