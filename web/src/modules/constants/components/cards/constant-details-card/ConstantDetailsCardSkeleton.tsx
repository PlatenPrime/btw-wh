import { DetailPanelCard } from "@/components/shared/cards";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ConstantDetailsCardSkeleton() {
  return (
    <DetailPanelCard className="p-2">
      <CardHeader className="p-0 pb-2">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="mt-1 h-4 w-32" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 p-0">
        <div className="overflow-hidden rounded-md border">
          <div className="grid gap-0 border-b bg-muted/30 p-2">
            <div className="flex gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex gap-4 border-b p-2 last:border-b-0">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="size-6 shrink-0 rounded-md" />
            </div>
          ))}
        </div>
      </CardContent>
    </DetailPanelCard>
  );
}
