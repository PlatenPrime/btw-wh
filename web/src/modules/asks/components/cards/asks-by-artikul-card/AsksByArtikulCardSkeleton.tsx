import { ListRowCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function AsksByArtikulCardSkeleton() {
  return (
    <ListRowCard className="grid gap-2">
      <div className="flex items-start justify-between gap-2">
        <div className="grid flex-1 gap-2">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="size-4" />
              <Skeleton className="h-3 w-32" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
        <Skeleton className="h-6 w-20 shrink-0 rounded-md" />
      </div>
    </ListRowCard>
  );
}
