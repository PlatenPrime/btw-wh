import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { RowDto } from "@/modules/rows/types/dto";
import { ArrowLeft, Plus, Warehouse } from "lucide-react";
import { Link } from "react-router";
import { Breadcrumb } from "./breadcrumb";
import { PalletsList } from "./pallets-list";
import { RowStats } from "./row-stats";

interface ViewProps {
  row: RowDto;
}

export function View({ row }: ViewProps) {
  const palletCount = row.pallets.length;
  const isOccupied = palletCount > 0;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb rowTitle={row.title} />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
              <Link to="/wh/rows">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-foreground text-3xl font-bold">{row.title}</h1>
            <Badge
              variant={isOccupied ? "default" : "secondary"}
              className="text-sm"
            >
              {palletCount} палет
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Детальна інформація про ряд складу
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Додати палету
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Редагувати
          </Button>
        </div>
      </div>

      <Separator />

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Row Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Warehouse className="h-5 w-5" />
              Інформація про ряд
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-muted-foreground text-sm font-medium">
                Назва ряду
              </label>
              <p className="text-foreground text-lg font-semibold">
                {row.title}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-muted-foreground text-sm font-medium">
                Статус
              </label>
              <div>
                <Badge
                  variant={isOccupied ? "default" : "secondary"}
                  className="text-sm"
                >
                  {isOccupied ? "Заповнений" : "Порожній"}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-muted-foreground text-sm font-medium">
                Кількість палет
              </label>
              <p className="text-foreground text-lg font-semibold">
                {palletCount}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-muted-foreground text-sm font-medium">
                Вільне місце
              </label>
              <p className="text-foreground text-lg font-semibold">
                {isOccupied ? "Обмежено" : "Вільний ряд"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Row Statistics */}
        <RowStats row={row} />

        {/* Pallets List */}
        <div className="lg:col-span-3">
          <PalletsList row={row} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" asChild>
          <Link to="/wh/rows">Назад до рядів</Link>
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Додати палету
        </Button>
      </div>
    </div>
  );
}
