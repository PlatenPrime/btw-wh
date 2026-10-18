import { DetailPanelCard } from "@/components/shared/cards";
import { CardTitle } from "@/components/ui/card";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { ArtDetailMetricsPanel } from "@/modules/arts/components/elements/art-detail-metrics-panel";
import { ArtProdPreview } from "@/modules/arts/components/elements/art-prod-preview";
import { BtradeArtDataPanel } from "@/modules/arts/components/elements/btrade-art-data-panel";

interface ArtDetailCardViewProps {
  artData: ArtDto;
}

function ArtDetailSectionLabel({ children }: { children: string }) {
  return <span className={typography.sectionLabel}>{children}</span>;
}

function getArtDisplayName(artikul: string, nameukr?: string): string | null {
  const trimmed = nameukr?.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith(artikul)) {
    const rest = trimmed.slice(artikul.length).trim();
    return rest.length > 0 ? rest : null;
  }

  return trimmed;
}

export function ArtDetailCardView({ artData }: ArtDetailCardViewProps) {
  const displayName = getArtDisplayName(artData.artikul, artData.nameukr);

  return (
    <DetailPanelCard className="gap-0 overflow-hidden p-0">
      <div className="grid lg:grid-cols-3 lg:items-stretch">
        <section className="flex min-w-0 items-start gap-4 border-border p-4 sm:p-5 lg:border-r">
          <ArtDialogImage
            artikul={artData.artikul}
            imageClassName="size-16 shrink-0 rounded-lg border border-border sm:size-20"
          />
          <div className="grid min-w-0 flex-1 gap-2">
            <CardTitle className={typography.detailTitle}>
              {artData.artikul}
            </CardTitle>
            {displayName ? (
              <p className={typography.detailSubtitle}>{displayName}</p>
            ) : null}
            <ArtProdPreview
              art={artData}
              imageSize="sm"
              className={typography.detailSubtitle}
              fallbackKeyClassName={cn(
                "text-muted-foreground",
                typography.detailSubtitle,
              )}
            />
          </div>
        </section>

        <section className="grid min-w-0 gap-3 self-start border-t border-border p-4 sm:p-5 lg:border-t-0 lg:border-r">
          <ArtDetailSectionLabel>Склад</ArtDetailSectionLabel>
          <ArtDetailMetricsPanel artData={artData} />
        </section>

        <section className="grid min-w-0 gap-3 self-start border-t border-border p-4 sm:p-5 lg:border-t-0">
          <ArtDetailSectionLabel>Sharik.ua</ArtDetailSectionLabel>
          <BtradeArtDataPanel artikul={artData.artikul} variant="embedded" />
        </section>
      </div>
    </DetailPanelCard>
  );
}
