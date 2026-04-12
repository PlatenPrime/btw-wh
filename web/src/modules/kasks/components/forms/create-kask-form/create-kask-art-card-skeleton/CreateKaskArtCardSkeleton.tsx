import { Skeleton } from "@/components/ui/skeleton";

export function CreateKaskArtCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="h-24 w-24 max-w-[6rem] shrink-0 rounded-md" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-28" />
    </div>
  );
}
