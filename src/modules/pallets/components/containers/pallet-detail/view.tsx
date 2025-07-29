import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Package, Warehouse } from "lucide-react";
import { useNavigate } from "react-router";
import type { IPallet } from "../../../api/types";

interface PalletDetailViewProps {
  pallet: IPallet;
}

export function PalletDetailView({ pallet }: PalletDetailViewProps) {
  const navigate = useNavigate();

  const handleBackToRow = () => {
    navigate(`/wh/rows/${pallet.rowData.title}`);
  };

  return (
    <div className="grid gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleBackToRow}>
            &larr; Назад до ряду
          </Button>
          <Badge variant="secondary">{pallet.poses.length} позицій</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Pallet info card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Інформація про палет
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm font-medium">
                Назва палета
              </p>
              <p className="text-lg font-semibold">{pallet.title}</p>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm font-medium">Ряд</p>
              <p className="text-base">{pallet.rowData.title}</p>
            </div>
            {pallet.sector && (
              <div className="space-y-2">
                <p className="text-muted-foreground text-sm font-medium">
                  Сектор
                </p>
                <p className="text-base">{pallet.sector}</p>
              </div>
            )}
            {pallet.createdAt && (
              <div className="space-y-2">
                <p className="text-muted-foreground flex items-center gap-1 text-sm font-medium">
                  <Calendar className="h-4 w-4" />
                  Створено
                </p>
                <p className="text-muted-foreground text-sm">
                  {new Date(pallet.createdAt).toLocaleDateString("uk-UA")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Poses summary card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Warehouse className="h-5 w-5" />
              Позиції на палеті
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Всього позицій:</span>
                <span className="font-semibold">{pallet.poses.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  Унікальних артикулів:
                </span>
                <span className="font-semibold">
                  {new Set(pallet.poses.map((pos) => pos.artikul)).size}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Загальна кількість:</span>
                <span className="font-semibold">
                  {pallet.poses.reduce((sum, pos) => sum + (pos.quant || 0), 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Загальні коробки:</span>
                <span className="font-semibold">
                  {pallet.poses.reduce((sum, pos) => sum + (pos.boxes || 0), 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Poses list */}
      <Card>
        <CardHeader>
          <CardTitle>Позиції на палеті</CardTitle>
        </CardHeader>
        <CardContent>
          {pallet.poses.length === 0 ? (
            <div className="py-8 text-center">
              <Package className="text-muted-foreground/50 mx-auto h-12 w-12" />
              <h3 className="text-muted-foreground mt-2 text-sm font-medium">
                Позиції не знайдено
              </h3>
              <p className="text-muted-foreground mt-1 text-xs">
                На цьому палеті поки немає позицій
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {pallet.poses.map((pos, index) => (
                <div
                  key={`${pos.artikul}-${index}`}
                  className="space-y-2 rounded-md border p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Артикул</span>
                    <Badge variant="outline">{pos.artikul}</Badge>
                  </div>
                  {pos.nameukr && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Назва</span>
                      <span className="text-muted-foreground text-sm">
                        {pos.nameukr}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Кількість</span>
                    <span className="font-semibold">{pos.quant || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Коробки</span>
                    <span className="font-semibold">{pos.boxes || 0}</span>
                  </div>
                  {pos.sklad && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Склад</span>
                      <span className="text-muted-foreground text-sm">
                        {pos.sklad}
                      </span>
                    </div>
                  )}
                  {pos.comment && (
                    <div className="pt-2">
                      <p className="text-muted-foreground text-xs">
                        {pos.comment}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
