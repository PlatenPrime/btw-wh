import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RowDto } from "@/modules/rows/types/dto";
import { Package, Plus, Search } from "lucide-react";
import { useState } from "react";

interface PalletsListProps {
  row: RowDto;
}

export function PalletsList({ row }: PalletsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const palletCount = row.pallets.length;
  const isOccupied = palletCount > 0;

  const filteredPallets = row.pallets.filter((pallet) =>
    pallet.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Палети в ряді
          </CardTitle>
          {isOccupied && (
            <Badge variant="outline" className="text-sm">
              {palletCount} палет
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isOccupied ? (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Пошук палет..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-10 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
            </div>

            {/* Pallets Grid */}
            {filteredPallets.length > 0 ? (
              <div className="space-y-3">
                <p className="text-muted-foreground text-sm">
                  Знайдено: {filteredPallets.length} з {palletCount}
                </p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPallets.map((pallet, index) => (
                    <div
                      key={index}
                      className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-3 transition-colors"
                    >
                      <span className="text-sm font-medium">{pallet}</span>
                      <Badge variant="secondary" className="text-xs">
                        #{index + 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <Package className="text-muted-foreground/50 mx-auto h-12 w-12" />
                <h3 className="text-muted-foreground mt-2 text-sm font-medium">
                  Палети не знайдено
                </h3>
                <p className="text-muted-foreground mt-1 text-xs">
                  Спробуйте змінити пошуковий запит
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 text-center">
            <Package className="text-muted-foreground/50 mx-auto h-12 w-12" />
            <h3 className="text-muted-foreground mt-2 text-sm font-medium">
              Ряд порожній
            </h3>
            <p className="text-muted-foreground mt-1 text-xs">
              Додайте палети для початку роботи
            </p>
            <Button size="sm" className="mt-3">
              <Plus className="mr-2 h-4 w-4" />
              Додати палету
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
