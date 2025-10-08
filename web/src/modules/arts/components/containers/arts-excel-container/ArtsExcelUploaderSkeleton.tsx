import { Skeleton } from "@/components/ui";

export function ArtsExcelUploaderSkeleton() {
  return (
    <div className="grid gap-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-10 w-32" />
    </div>
  );
}
