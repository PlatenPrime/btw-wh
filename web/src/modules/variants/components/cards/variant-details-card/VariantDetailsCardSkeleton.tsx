import { DetailPanelCard } from "@/components/shared/cards";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function VariantDetailsCardSkeleton() {
  return (
    <DetailPanelCard className="gap-0 overflow-hidden p-0">
      <Skeleton className="h-8 w-full rounded-none" />
      <CardHeader className="p-6">
        <div className="flex items-start gap-4">
          <Skeleton className="size-20 shrink-0 rounded-lg" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-6">
        <Skeleton className="h-4 w-56" />
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2 border-t-0 p-6 pt-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="h-4 w-28" />
        </div>
      </CardFooter>
    </DetailPanelCard>
  );
}
