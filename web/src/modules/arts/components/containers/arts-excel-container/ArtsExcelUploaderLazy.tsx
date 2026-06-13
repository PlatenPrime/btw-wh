import { lazyWithRetry } from "@/lib/chunk-load";
import { Suspense } from "react";
import { ArtsExcelUploaderSkeleton } from "./ArtsExcelUploaderSkeleton";

const ArtsExcelUploader = lazyWithRetry(() =>
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
