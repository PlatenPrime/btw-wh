import { DefCardSkeleton } from "@/modules/defs/components/cards/def-card/DefCardSkeleton";

export function DefsGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <DefCardSkeleton key={index} />
      ))}
    </div>
  );
}
