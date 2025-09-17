import { Container } from "@/components/shared/container";
import { Skeleton } from "@/components/ui/skeleton";

export function AskPosesByArtikulContainerSkeleton() {
  return (
    <div className="grid gap-4">
      {/* Заголовок секции */}
      <div className="border-b pb-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="mt-1 h-4 w-64" />
      </div>

      {/* Общая статистика */}
      <div className="grid gap-2">
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      {/* Позиции по складам */}
      <div className="grid items-start gap-4 lg:grid-cols-2">
        {/* Погреби */}
        <Container className="grid gap-2">
          <div className="grid grid-cols-3">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-8" />
            <Skeleton className="h-5 w-8" />
          </div>
          <div className="grid gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="grid grid-cols-3 gap-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        </Container>

        {/* Мережі */}
        <Container className="grid gap-2">
          <div className="grid grid-cols-3">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-8" />
            <Skeleton className="h-5 w-8" />
          </div>
          <div className="grid gap-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="grid grid-cols-3 gap-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
