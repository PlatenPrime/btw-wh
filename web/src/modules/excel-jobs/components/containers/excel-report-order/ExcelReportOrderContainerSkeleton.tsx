import { DetailPanelCard } from "@/components/shared/cards";
import { Skeleton } from "@/components/ui/skeleton";

export function ExcelReportOrderContainerSkeleton() {
  return (
    <DetailPanelCard className="p-4">
      <div className="grid gap-4">
        <Skeleton className="h-3 w-24" />
        <div className="grid gap-3 rounded-lg bg-muted/40 p-4">
          <Skeleton className="h-5 w-48" />
          <div className="grid gap-2 sm:grid-cols-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
        <div className="flex justify-end border-t border-border pt-4">
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </DetailPanelCard>
  );
}
