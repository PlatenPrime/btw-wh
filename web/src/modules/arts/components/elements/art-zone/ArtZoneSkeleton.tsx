import { Skeleton } from "@/components/ui/skeleton";

export function ArtZoneSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-16" />
    </div>
  );
}
