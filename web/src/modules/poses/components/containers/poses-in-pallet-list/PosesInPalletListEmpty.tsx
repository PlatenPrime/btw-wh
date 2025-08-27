import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

export function PosesInPalletListEmpty() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Позиції на палеті</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="py-8 text-center">
          <Package className="text-muted-foreground/50 mx-auto h-12 w-12" />
          <h3 className="text-muted-foreground mt-2 text-sm font-medium">
            Позиції не знайдено
          </h3>
          <p className="text-muted-foreground mt-1 text-xs">
            На цій палеті поки немає позицій
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
