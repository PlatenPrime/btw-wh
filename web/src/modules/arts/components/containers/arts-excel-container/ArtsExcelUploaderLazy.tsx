import { lazy, Suspense } from "react";
import { ArtsExcelUploaderSkeleton } from "./ArtsExcelUploaderSkeleton";

const ArtsExcelUploader = lazy(() =>
  import("./ArtsExcelUploader").then((module) => ({
    default: module.ArtsExcelUploader,
  })),
);

export function ArtsExcelUploaderLazy() {
  return (
    <Suspense fallback={<ArtsExcelUploaderSkeleton />}>
      <ArtsExcelUploader />
    </Suspense>
  );
}
