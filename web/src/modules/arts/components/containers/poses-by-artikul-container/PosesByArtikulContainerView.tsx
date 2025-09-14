import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { GetPosesByArtikulResponse } from "@/modules/poses/api/types";
import { Circle, Package, Warehouse } from "lucide-react";
import { Link } from "react-router";
import { TotalItem } from "./components/total-item/TotalItem";

interface PosesByArtikulContainerViewProps {
  data: GetPosesByArtikulResponse;
}

export function PosesByArtikulContainerView({
  data,
}: PosesByArtikulContainerViewProps) {
  const { pogrebi, merezhi, totalQuant, totalBoxes } = data;

  return (
    <div className="grid gap-6">
      {/* Общая статистика */}
      <div className="flex gap-4">
        <TotalItem
          quant={data.total}
          icon={<Warehouse className="text-muted-foreground h-4 w-4" />}
        />
          <TotalItem
            quant={totalBoxes}
            icon={<Package className="text-muted-foreground h-4 w-4" />}
          />
        <TotalItem
          quant={totalQuant}
          icon={<Circle className="text-muted-foreground h-4 w-4" />}
        />
      </div>

      {/* Позиции по складам */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Склад "Погреби" */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Погреби</h3>
            <Badge variant="secondary">
              {pogrebi.quant || 0} шт. / {pogrebi.boxes || 0} кор.
            </Badge>
          </div>
          <div className="grid gap-3">
            {pogrebi.poses?.map((pos, index) => (
              <Card
                key={`pogrebi-${pos._id}-${index}`}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-4">
                  <Link
                    to={`/wh/pallets/${pos.palletData?.title || "unknown"}`}
                    className="hover:bg-muted/50 -m-2 block rounded-md p-2 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-medium">
                          {pos.palletData?.title || "Невідома паллета"}
                        </h4>
                        <p className="text-muted-foreground truncate text-xs">
                          {pos.rowData?.title || "Невідомий ряд"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Circle className="h-3 w-3" />
                          <span>{pos.quant || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          <span>{pos.boxes || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Склад "Мережі" */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Мережі</h3>
            <Badge variant="secondary">
              {merezhi.quant || 0} шт. / {merezhi.boxes || 0} кор.
            </Badge>
          </div>
          <div className="grid gap-3">
            {merezhi.poses?.map((pos, index) => (
              <Card
                key={`merezhi-${pos._id}-${index}`}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-4">
                  <Link
                    to={`/wh/pallets/${pos.palletData?.title || "unknown"}`}
                    className="hover:bg-muted/50 -m-2 block rounded-md p-2 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-medium">
                          {pos.palletData?.title || "Невідома паллета"}
                        </h4>
                        <p className="text-muted-foreground truncate text-xs">
                          {pos.rowData?.title || "Невідомий ряд"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Circle className="h-3 w-3" />
                          <span>{pos.quant || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          <span>{pos.boxes || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
