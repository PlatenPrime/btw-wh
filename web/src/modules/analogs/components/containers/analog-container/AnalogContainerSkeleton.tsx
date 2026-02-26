import { AnalogDetailsCardSkeleton } from "@/modules/analogs/components/cards/analog-details-card";

export function AnalogContainerSkeleton() {
  return (
    <div className="grid gap-4 p-4">
      <AnalogDetailsCardSkeleton />
    </div>
  );
}
