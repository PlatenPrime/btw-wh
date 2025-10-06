import { Container } from "@/components/shared/containers/Container";
import { PalletInRowCardSkeleton } from "@/modules/pallets/components/cards/pallet-in-row-card/PalletInRowCardSkeleton";

export function PalletsListSkeleton() {
  return (
    <Container className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <PalletInRowCardSkeleton key={index} />
      ))}
    </Container>
  );
}
