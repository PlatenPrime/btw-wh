import { ListRowCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";
import { ArtDialogImageSkeleton } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImageSkeleton";

export function AsksListCardSkeleton() {
  return (
    <ListRowCard className="grid gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <ArtDialogImageSkeleton />

          <div className="grid min-w-0 flex-1 gap-1">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-full max-w-xs" />
          </div>
        </div>
        <Skeleton className="h-5 w-20 shrink-0 rounded-md" />
      </div>

      <div className="grid">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 shrink-0" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 shrink-0" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>

      <div className="border-border/40 flex flex-wrap items-center justify-between gap-2 border-t pt-2">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-4" />
          <Skeleton className="h-4 w-36" />
        </div>
      </div>
    </ListRowCard>
  );
}
