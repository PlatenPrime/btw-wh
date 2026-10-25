import { MetricChipSkeleton } from "@/components/shared/elements";

export function AskDetailsRequesterRowSkeleton() {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <MetricChipSkeleton className="w-full" />
      <MetricChipSkeleton className="w-full" />
    </div>
  );
}
