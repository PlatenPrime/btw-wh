import { ThemedVStack } from "@/components/themed";
import { BlockCardSkeleton } from "@/modules/blocks/components/cards/block-card";

export function BlocksContainerSkeleton() {
  return (
    <ThemedVStack className="gap-2 p-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <BlockCardSkeleton key={i} />
      ))}
    </ThemedVStack>
  );
}
