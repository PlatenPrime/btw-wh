import { Skeleton } from "@/components/ui/skeleton";

export function ReportEntitySearchSkeleton() {
  return (
    <div className="grid gap-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-10 w-full" />
      ))}
    </div>
  );
}
