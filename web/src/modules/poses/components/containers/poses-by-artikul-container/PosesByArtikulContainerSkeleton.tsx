import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";

export function PosesByArtikulContainerSkeleton() {
  return (
    <div className="grid gap-4">
      {/* Позиции по складам */}
      <div className="grid items-start gap-4 lg:grid-cols-2">
        {/* Погреби */}
        <Wrapper className="grid gap-2">
          <div className="grid grid-cols-3">
            <Skeleton className="h-5 w-16 pl-4" />
            <div className="flex items-center justify-center">
              <Skeleton className="h-5 w-8" />
            </div>
            <div className="flex items-center justify-end pr-2">
              <Skeleton className="h-5 w-8" />
            </div>
          </div>
          <div className="grid gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-8 w-full rounded-md" />
              </div>
            ))}
          </div>
        </Wrapper>

        {/* Мережі */}
        <Wrapper className="grid gap-2">
          <div className="grid grid-cols-3">
            <Skeleton className="h-5 w-16 pl-4" />
            <div className="flex items-center justify-center">
              <Skeleton className="h-5 w-8" />
            </div>
            <div className="flex items-center justify-end pr-2">
              <Skeleton className="h-5 w-8" />
            </div>
          </div>
          <div className="grid gap-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-8 w-full rounded-md" />
              </div>
            ))}
          </div>
        </Wrapper>
      </div>
    </div>
  );
}
