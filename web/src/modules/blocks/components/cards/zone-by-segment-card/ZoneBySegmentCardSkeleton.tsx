import { ListRowCard } from "@/components/shared/cards";
import {
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ZoneBySegmentCardSkeleton() {
  return (
    <ListRowCard>
      <CardHeader className="p-0">
        <CardTitle>
          <Skeleton className="h-5 w-32" />
        </CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <Skeleton className="size-4 shrink-0" />
            <Skeleton className="h-3.5 w-20" />
          </div>
        </CardDescription>
        <CardAction>
          <Skeleton className="size-6 shrink-0 rounded" />
        </CardAction>
      </CardHeader>
    </ListRowCard>
  );
}
