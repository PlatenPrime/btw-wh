import { SurfaceSection } from "@/components/shared/layout";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDetailCard } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCard";
import { ArtChartsSectionLayout } from "@/modules/arts/components/charts/art-charts-section";
import { ArtSalesChartContainer } from "@/modules/arts/components/containers/art-sales-chart-container";
import { ArtStockChartContainer } from "@/modules/arts/components/containers/art-stock-chart-container";
import { PosesByArtikulContainer } from "@/modules/arts/components/containers/poses-by-artikul-container";
import {
  AsksByArtikulContainer,
  AsksByArtikulContainerSkeleton,
} from "@/modules/asks/components/containers/asks-by-artikul-container";
import { AsksByArtikulFetcher } from "@/modules/asks/components/fetchers/asks-by-artikul-fetcher";
import { memo } from "react";

interface ArtContainerViewProps {
  artData: ArtDto;
  showCharts?: boolean;
  showAnalogs?: boolean;
  dateFrom: string;
  dateTo: string;
  onDateRangeChange: (from: string, to: string) => void;
}

export const ArtContainerView = memo(function ArtContainerView({
  artData,
  showCharts = false,
  showAnalogs = false,
  dateFrom,
  dateTo,
  onDateRangeChange,
}: ArtContainerViewProps) {
  return (
    <section className="grid gap-2">
      <SurfaceSection>
        <ArtDetailCard artData={artData} />
      </SurfaceSection>

      <SurfaceSection>
        <PosesByArtikulContainer artikul={artData.artikul} />
      </SurfaceSection>


      {showCharts ? (
        <SurfaceSection>
          <ArtChartsSectionLayout
            dateFrom={dateFrom}
            dateTo={dateTo}
            onDateRangeChange={onDateRangeChange}
            stockChart={
              <ArtStockChartContainer
                artikul={artData.artikul}
                dateFrom={dateFrom}
                dateTo={dateTo}
              />
            }
            salesChart={
              <ArtSalesChartContainer
                artikul={artData.artikul}
                dateFrom={dateFrom}
                dateTo={dateTo}
              />
            }
          />
        </SurfaceSection>
      ) : null}

      <SurfaceSection>
        <AsksByArtikulFetcher
          artikul={artData.artikul}
          ContainerComponent={AsksByArtikulContainer}
          SkeletonComponent={AsksByArtikulContainerSkeleton}
        />
      </SurfaceSection>
    </section>
  );
});
