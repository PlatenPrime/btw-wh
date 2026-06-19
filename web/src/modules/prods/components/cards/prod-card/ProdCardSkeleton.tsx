import { ListRowCard } from "@/components/shared/cards";
import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProdCardSkeleton() {
  return (
    <ListRowCard>
      <CardContent className="flex items-center gap-2 p-0">
        <Skeleton className="size-12 shrink-0 rounded-lg" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="size-8 shrink-0 rounded-md" />
      </CardContent>
    </ListRowCard>
  );
}
