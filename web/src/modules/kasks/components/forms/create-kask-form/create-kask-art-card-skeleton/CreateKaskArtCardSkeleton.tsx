import { Skeleton } from "@/components/ui/skeleton";

export function CreateKaskArtCardSkeleton() {
  return (
    <div className="flex w-full flex-col items-center gap-3 py-1">
      <Skeleton className="aspect-square w-full max-w-[8rem] rounded-lg" />
      <Skeleton className="h-4 w-3/4 max-w-[10rem]" />
      <Skeleton className="h-3 w-1/2 max-w-[7rem]" />
    </div>
  );
}
