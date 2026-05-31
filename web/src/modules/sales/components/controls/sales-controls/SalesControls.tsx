import { ChartDateRangeToolbar } from "@/components/shared/charts/chart-date-range-toolbar/ChartDateRangeToolbar";
import {
  KonkEntitySelect,
  ProdEntitySelect,
} from "@/components/shared/controls";
import { SurfaceSection } from "@/components/shared/layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";

const ABC_OPTIONS = [
  { value: "all", label: "ABC" },
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
] as const;

interface SalesControlsProps {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  abc: string;
  onKonkChange: (value: string) => void;
  onProdChange: (value: string) => void;
  onDateRangeChange: (from: string, to: string) => void;
  onAbcChange: (value: string) => void;
}

export function SalesControls({
  konk,
  prod,
  dateFrom,
  dateTo,
  abc,
  onKonkChange,
  onProdChange,
  onDateRangeChange,
  onAbcChange,
}: SalesControlsProps) {
  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();
  const konks = konksQuery.data?.data ?? [];
  const prods = prodsQuery.data?.data ?? [];

  return (
    <SurfaceSection className="grid grid-cols-1 gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <KonkEntitySelect value={konk} onValueChange={onKonkChange} konks={konks} />

        <ProdEntitySelect value={prod} onValueChange={onProdChange} prods={prods} />

        <Select
          value={abc || "all"}
          onValueChange={(v) => onAbcChange(v === "all" ? "" : v)}
        >
          <SelectTrigger
            aria-label="ABC"
            className="min-w-[100px] sm:min-w-[120px]"
          >
            <SelectValue placeholder="ABC" />
          </SelectTrigger>
          <SelectContent>
            {ABC_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <ChartDateRangeToolbar
          layout="inline"
          idPrefix="sales-controls"
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateRangeChange={onDateRangeChange}
        />
      </div>
    </SurfaceSection>
  );
}
