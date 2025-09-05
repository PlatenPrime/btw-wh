import { AsksListCardSkeleton } from "@/modules/asks/components/cards/asks-list-card/AsksListCardSkeleton";

export function AsksListSkeleton() {
  return (
    <div className="grid gap-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <AsksListCardSkeleton key={index} />
      ))}
    </div>
  );
}
