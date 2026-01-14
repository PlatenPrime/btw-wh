import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AsksByArtikulCardSkeleton() {
  return (
    <Card className="grid gap-2 p-2">
      <div className="flex items-start justify-between gap-2">
        <div className="grid flex-1 gap-2">
          {/* Скелетоны для ключевых элементов: дата и имя asker */}
          <div className="grid gap-2">
            {/* Дата */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-3 w-32" />
            </div>
            {/* Имя asker */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="grid gap-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Статус */}
        <div className="flex-shrink-0">
          <Skeleton className="h-6 w-20 rounded-md" />
        </div>
      </div>
    </Card>
  );
}
