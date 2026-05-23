import { DetailPanelCard } from "@/components/shared/cards";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function AnalogDetailsCardSkeleton() {
  return (
    <DetailPanelCard className="gap-0 overflow-hidden p-0">
      <Skeleton className="h-8 w-full rounded-none" />
      <CardHeader className="flex flex-col gap-4 p-6 pb-4 md:flex-row md:items-start">
        <div className="flex w-full items-start gap-3">
          <Skeleton className="size-16 shrink-0 rounded-md" />
          <div className="grid flex-1 gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="grid gap-4 p-6">
        <Skeleton className="h-4 w-56" />
        <div className="grid gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex flex-wrap gap-x-6 gap-y-1 border-t-0 p-6 pt-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="h-4 w-28" />
        </div>
      </CardFooter>
    </DetailPanelCard>
  );
}
