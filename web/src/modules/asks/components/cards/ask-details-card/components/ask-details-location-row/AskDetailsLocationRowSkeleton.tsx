import { Skeleton } from "@/components/ui/skeleton";

export function AskDetailsLocationRowSkeleton() {
  return (
    <div className="border-border/40 flex items-center gap-2 border-t px-4 py-2.5">
      <Skeleton className="h-[22px] w-20 rounded-full" />
      <Skeleton className="h-[22px] w-16 rounded-full" />
    </div>
  );
}
