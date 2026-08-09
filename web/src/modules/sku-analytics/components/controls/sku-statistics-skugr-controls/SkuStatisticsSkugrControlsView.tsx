import { ChartDateRangeToolbar } from "@/components/shared/charts/chart-date-range-toolbar/ChartDateRangeToolbar";
import { EntityLabel } from "@/components/shared/entities/entity-label";
import { SurfaceSection } from "@/components/shared/layout";

export interface SkuStatisticsSkugrControlsViewProps {
  dateFrom: string;
  dateTo: string;
  onDateRangeChange: (from: string, to: string) => void;
  konkName?: string;
  prodName?: string;
  konkImageUrl?: string | null;
  konkTitle?: string | null;
  prodImageUrl?: string | null;
  prodTitle?: string | null;
}

export function SkuStatisticsSkugrControlsView({
  dateFrom,
  dateTo,
  onDateRangeChange,
  konkName,
  prodName,
  konkImageUrl,
  konkTitle,
  prodImageUrl,
  prodTitle,
}: SkuStatisticsSkugrControlsViewProps) {
  return (
    <SurfaceSection className="grid grid-cols-1 gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
        {konkName ? (
          <div className="flex min-w-0 items-center gap-2">
            <EntityLabel
              imageUrl={konkImageUrl}
              title={konkTitle}
              fallbackLabel={konkName}
              imageSize="xs"
              className="text-foreground text-sm font-medium"
            />
          </div>
        ) : null}

        {prodName ? (
          <div className="flex min-w-0 items-center gap-2">
            <EntityLabel
              imageUrl={prodImageUrl}
              title={prodTitle}
              fallbackLabel={prodName}
              imageSize="xs"
              className="text-foreground text-sm font-medium"
            />
          </div>
        ) : null}

        <ChartDateRangeToolbar
          layout="inline"
          idPrefix="sku-statistics-skugr"
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateRangeChange={onDateRangeChange}
        />
      </div>
    </SurfaceSection>
  );
}
