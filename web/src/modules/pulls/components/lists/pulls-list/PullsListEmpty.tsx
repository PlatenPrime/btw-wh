import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";

export function PullsListEmpty() {
  return (
    <Card className="p-8 text-center">
      <CardContent className="flex flex-col items-center gap-2">
        <Package className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-medium">Pulls не знайдено</h3>
        <p className="text-muted-foreground text-sm">
          Немає активних pulls для обробки
        </p>
      </CardContent>
    </Card>
  );
}

