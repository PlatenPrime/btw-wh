import { Skeleton } from "@/components/ui/skeleton";

export function ArtInfoSkeleton() {
  return (
    <section className="flex  gap-2">
      <Skeleton className="h-24 w-24" />
      <Skeleton className="h-24 w-full" />
    </section>
  );
}
