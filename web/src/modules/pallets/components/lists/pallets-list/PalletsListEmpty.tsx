import { Columns4 } from "lucide-react";

export function PalletsListEmpty() {
  return (
    <div className="py-8 text-center">
      <Columns4 className="text-muted-foreground/50 mx-auto h-12 w-12" />
      <h3 className="text-muted-foreground mt-2 text-sm font-medium">
        Палети не знайдено
      </h3>
      <p className="text-muted-foreground mt-1 text-xs">
        Додайте палети для початку роботи
      </p>
    </div>
  );
}
