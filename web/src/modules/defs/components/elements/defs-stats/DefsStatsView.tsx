import { CalendarDate } from "@/components/shared/date/CalendarDate";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Defcalc } from "@/modules/defs/api/types/dto";
import { useMemo } from "react";

interface DefsStatsViewProps {
  defsData: Defcalc;
}

export function DefsStatsView({ defsData }: DefsStatsViewProps) {
  const stats = useMemo(() => {
    const items = Object.values(defsData.result);

    return {
      total: defsData.totalItems,
      deficits: defsData.totalDeficits,
      critical: items.filter((item) => item.difQuant <= 0).length,
      nearLimit: items.filter(
        (item) => item.difQuant > 0 && item.limit && item.quant <= item.limit,
      ).length,
    };
  }, [defsData]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total items */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Всего товаров</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
        </CardContent>
      </Card>

      {/* Total deficits */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Дефицитных</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {stats.deficits}
          </div>
        </CardContent>
      </Card>

      {/* Critical deficits */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Критических</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {stats.critical}
          </div>
        </CardContent>
      </Card>

      {/* Near limit */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">У лимита</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {stats.nearLimit}
          </div>
        </CardContent>
      </Card>

      {/* Last calculation date */}
      <Card className="md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Последний расчет
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <CalendarDate date={defsData.createdAt} />
            <Badge variant="outline" className="text-xs">
              {new Date(defsData.createdAt).toLocaleString("ru-RU")}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
