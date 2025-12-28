import { VStack } from "@/components/ui";
import { BlockCardSkeleton } from "@/modules/blocks/components/cards/block-card";

export function BlocksContainerSkeleton() {
  return (
    <VStack className="gap-2 p-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <BlockCardSkeleton key={i} />
      ))}
    </VStack>
  );
}

