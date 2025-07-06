import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RowDto } from "@/modules/rows/types/dto";
import { Edit, MoreVertical, Package, Trash2, Warehouse } from "lucide-react";
import { Link } from "react-router";
import { DeleteRowDialog } from "../delete-row-dialog";
import { RowDialog } from "../row-dialog";

interface GridCardProps {
  row: RowDto;
  onRowUpdated?: () => void;
}

export function GridCard({ row, onRowUpdated }: GridCardProps) {
  const palletCount = row.pallets.length;
  const isOccupied = palletCount > 0;

  return (
    <Card className="bg-background shadow-muted-foreground group h-full p-0 shadow-none ring-1 ring-gray-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:shadow-2xl md:hover:-translate-y-1 md:hover:scale-105 dark:ring-gray-700">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <Link to={`/wh/rows/${row.title}`} className="flex-1">
            <CardTitle className="text-foreground group-hover:text-primary text-lg font-semibold">
              {row.title}
            </CardTitle>
          </Link>
          <div className="flex items-center gap-2">
            <Badge
              variant={isOccupied ? "default" : "secondary"}
              className="ml-2"
            >
              {palletCount}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <RowDialog
                    row={row}
                    trigger={
                      <div className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Edit Row
                      </div>
                    }
                    onSuccess={onRowUpdated}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <DeleteRowDialog
                    row={row}
                    trigger={
                      <div className="text-destructive flex items-center gap-2">
                        <Trash2 className="h-4 w-4" />
                        Delete Row
                      </div>
                    }
                    onSuccess={onRowUpdated}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Link to={`/wh/rows/${row.title}`} className="block">
          <div className="space-y-3">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <Package className="h-4 w-4" />
              <span>Кількість палет: {palletCount}</span>
            </div>

            {isOccupied ? (
              <div className="space-y-2">
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Warehouse className="h-4 w-4" />
                  <span>Палети:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {row.pallets.slice(0, 3).map((pallet, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset dark:bg-blue-900/20 dark:text-blue-300 dark:ring-blue-300/20"
                    >
                      {pallet}
                    </span>
                  ))}
                  {row.pallets.length > 3 && (
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-600/20">
                      +{row.pallets.length - 3} ще
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Warehouse className="h-4 w-4" />
                <span>Ряд порожній</span>
              </div>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
