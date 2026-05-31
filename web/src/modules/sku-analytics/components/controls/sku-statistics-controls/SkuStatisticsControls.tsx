import { ChartDateRangeToolbar } from "@/components/shared/charts/chart-date-range-toolbar/ChartDateRangeToolbar";
import { KonkEntitySelect } from "@/components/shared/controls";
import { SurfaceSection } from "@/components/shared/layout";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";

interface SkuStatisticsControlsProps {
  konk: string;
  dateFrom: string;
  dateTo: string;
  onKonkChange: (value: string) => void;
  onDateRangeChange: (from: string, to: string) => void;
}

export function SkuStatisticsControls({
  konk,
  dateFrom,
  dateTo,
  onKonkChange,
  onDateRangeChange,
}: SkuStatisticsControlsProps) {
  const konksQuery = useKonksQuery();
  const konks = konksQuery.data?.data ?? [];

  return (
    <SurfaceSection className="grid grid-cols-1 gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <KonkEntitySelect
          value={konk}
          onValueChange={onKonkChange}
          konks={konks}
          className="min-w-[180px] sm:min-w-[220px]"
        />

        <ChartDateRangeToolbar
          layout="inline"
          idPrefix="sku-statistics-controls"
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateRangeChange={onDateRangeChange}
        />
      </div>
    </SurfaceSection>
  );
}
