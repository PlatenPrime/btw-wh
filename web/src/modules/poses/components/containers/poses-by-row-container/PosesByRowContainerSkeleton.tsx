import { PosInPalletCardSkeleton } from "@/modules/poses/components/cards/pos-in-pallet-card/PosInPalletCardSkeleton";

export function PosesByRowContainerSkeleton() {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <PosInPalletCardSkeleton key={index} />
      ))}
    </section>
  );
}
