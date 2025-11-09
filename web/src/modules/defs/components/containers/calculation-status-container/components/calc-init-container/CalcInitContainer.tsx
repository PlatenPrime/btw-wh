import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export function CalcInitContainer() {
  return (
    <Wrapper className="space-y-4 p-4">
      <div className="flex items-center gap-2">
        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
        <h3 className="text-lg font-semibold">
          Розрахунок дефіцитів виконується
        </h3>
        <Badge variant="default" className="bg-blue-100 text-blue-800">
          Запуск...
        </Badge>
      </div>

      <div className="bg-muted rounded-lg p-3">
        <p className="text-sm font-medium">Ініціалізація процесу розрахунку</p>
        <p className="text-muted-foreground mt-1 text-xs">
          Отримання даних про статус...
        </p>
      </div>
    </Wrapper>
  );
}
