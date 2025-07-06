import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RowDto } from "@/modules/rows/types/dto";
import { BarChart3, Calendar, Package, Warehouse } from "lucide-react";

interface RowStatsProps {
  row: RowDto;
}

export function RowStats({ row }: RowStatsProps) {
  const palletCount = row.pallets.length;
  const isOccupied = palletCount > 0;

  // Calculate some mock statistics (in a real app, these would come from the API)
  const utilizationRate = isOccupied ? Math.min(palletCount * 10, 100) : 0;
  const lastUpdated = new Date().toLocaleDateString("uk-UA");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Статистика ряду
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Warehouse className="text-muted-foreground h-4 w-4" />
              <span className="text-sm font-medium">Використання</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-muted h-2 flex-1 rounded-full">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${utilizationRate}%` }}
                />
              </div>
              <span className="text-sm font-semibold">{utilizationRate}%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Package className="text-muted-foreground h-4 w-4" />
              <span className="text-sm font-medium">Палети</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{palletCount}</span>
              <Badge
                variant={isOccupied ? "default" : "secondary"}
                className="text-xs"
              >
                {isOccupied ? "Активний" : "Порожній"}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="text-muted-foreground h-4 w-4" />
              <span className="text-sm font-medium">Останнє оновлення</span>
            </div>
            <span className="text-sm">{lastUpdated}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="text-muted-foreground h-4 w-4" />
              <span className="text-sm font-medium">Статус</span>
            </div>
            <Badge
              variant={isOccupied ? "default" : "secondary"}
              className="text-xs"
            >
              {isOccupied ? "Заповнений" : "Вільний"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
