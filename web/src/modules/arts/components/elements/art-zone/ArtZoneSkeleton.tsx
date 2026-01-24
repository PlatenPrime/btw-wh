import { Skeleton } from "@/components/ui/skeleton";

export function ArtZoneSkeleton() {
  return (
    <p className="text-foreground flex items-center gap-2 text-xs text-nowrap">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-16" />
    </p>
  );
}
