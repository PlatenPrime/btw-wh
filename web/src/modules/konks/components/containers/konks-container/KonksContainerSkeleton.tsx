import { KonksGridSkeleton } from "@/modules/konks/components/lists/konks-grid";

export function KonksContainerSkeleton() {
  return (
    <div className="grid gap-2">
      <KonksGridSkeleton />
    </div>
  );
}
