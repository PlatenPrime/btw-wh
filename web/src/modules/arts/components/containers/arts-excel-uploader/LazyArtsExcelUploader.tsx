import { Skeleton } from "@/components/ui/skeleton";
import { lazy, Suspense } from "react";

const ArtsExcelUploader = lazy(() =>
  import("./ArtsExcelUploader").then((module) => ({
    default: module.ArtsExcelUploader,
  })),
);

export function LazyArtsExcelUploader() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      }
    >
      <ArtsExcelUploader />
    </Suspense>
  );
}
