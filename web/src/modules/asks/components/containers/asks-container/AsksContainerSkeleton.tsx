import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { AsksListSkeleton } from "@/modules/asks/components/lists/asks-list/AsksListSkeleton";
import { DateNavigationSkeleton } from "@/components/shared/date-navigation/DateNavigationSkeleton";

export function AsksContainerSkeleton() {
  return (
    <main className="grid gap-2">
      <Wrapper className="grid gap-2 lg:grid-cols-2">
        <DateNavigationSkeleton />
        <div className="flex w-full items-center justify-end gap-2">
          <Skeleton className="h-5 w-20" />
        </div>
      </Wrapper>
      <Wrapper>
        <AsksListSkeleton />
      </Wrapper>
    </main>
  );
}
