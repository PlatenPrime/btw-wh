import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EnrichedAnalogDto } from "@/modules/analogs/api/types";
import { AnalogDetailsCard } from "@/modules/analogs/components/cards/analog-details-card";
import { AnalogSalesChartContainer } from "@/modules/analogs/components/containers/analog-sales-chart-container";
import { AnalogSlicesChartContainer } from "@/modules/analogs/components/containers/analog-slices-chart-container";
import { format, subDays } from "date-fns";
import { useMemo, useState } from "react";

const PERIOD_OPTIONS = [
  { value: "7", label: "7 днів" },
  { value: "30", label: "30 днів" },
  { value: "90", label: "90 днів" },
] as const;

function getPeriod(days: number): { dateFrom: string; dateTo: string } {
  const today = new Date();
  const from = subDays(today, days - 1);
  return {
    dateFrom: format(from, "yyyy-MM-dd"),
    dateTo: format(today, "yyyy-MM-dd"),
  };
}

interface AnalogContainerViewProps {
  analog: EnrichedAnalogDto;
}

export function AnalogContainerView({ analog }: AnalogContainerViewProps) {
  const [periodDays, setPeriodDays] = useState<number>(30);
  const { dateFrom, dateTo } = useMemo(
    () => getPeriod(periodDays),
    [periodDays],
  );

  return (
    <div className="grid gap-2">
      <AnalogDetailsCard analog={analog} />
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <Label
            htmlFor="analog-charts-period"
            className="text-muted-foreground text-sm"
          >
            Період
          </Label>
          <Select
            value={String(periodDays)}
            onValueChange={(v) => setPeriodDays(Number(v))}
          >
            <SelectTrigger id="analog-charts-period" className="w-[120px]" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PERIOD_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <Card className="overflow-hidden shadow-md">
            <CardHeader className="pb-2">
              <h3 className="text-muted-foreground text-sm font-medium">
                Динаміка залишків та ціни
              </h3>
            </CardHeader>
            <CardContent>
              <AnalogSlicesChartContainer
                analogId={analog._id}
                dateFrom={dateFrom}
                dateTo={dateTo}
              />
            </CardContent>
          </Card>
          <Card className="overflow-hidden shadow-md">
            <CardHeader className="pb-2">
              <h3 className="text-muted-foreground text-sm font-medium">
                Динаміка продаж
              </h3>
            </CardHeader>
            <CardContent>
              <AnalogSalesChartContainer
                analogId={analog._id}
                dateFrom={dateFrom}
                dateTo={dateTo}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
