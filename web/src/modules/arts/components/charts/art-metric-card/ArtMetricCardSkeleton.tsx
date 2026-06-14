import { ArtMetricCard } from "@/modules/arts/components/charts/art-metric-card/ArtMetricCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ArtMetricCardSkeletonProps {
  className?: string;
  valueWidthClassName?: string;
}

export function ArtMetricCardSkeleton({
  className,
  valueWidthClassName = "w-28",
}: ArtMetricCardSkeletonProps) {
  return (
    <ArtMetricCard className={className}>
      <Skeleton className={cn("h-6", valueWidthClassName)} />
    </ArtMetricCard>
  );
}
