import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { BlockDto } from "@/modules/blocks/api/types";
import { BlockCard } from "@/modules/blocks/components/cards/block-card";

interface BlocksGridProps {
  blocks: BlockDto[];
  onDelete?: (block: BlockDto) => void;
}

export function BlocksGrid({ blocks, onDelete }: BlocksGridProps) {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2">
      {blocks.map((block) => (
        <BlockCard key={block._id} block={block} onDelete={onDelete} />
      ))}
    </Wrapper>
  );
}

