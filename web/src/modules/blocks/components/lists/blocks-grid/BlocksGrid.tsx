import { ContentRevealStagger } from "@/components/shared/motion";
import { SurfaceSection } from "@/components/shared/layout";
import type { BlockDto } from "@/modules/blocks/api/types";
import { BlockCard } from "@/modules/blocks/components/cards/block-card";

interface BlocksGridProps {
  blocks: BlockDto[];
  onDelete?: (block: BlockDto) => void;
}

export function BlocksGrid({ blocks, onDelete }: BlocksGridProps) {
  return (
    <SurfaceSection className="p-2">
      <ContentRevealStagger className="grid grid-cols-1 gap-2">
        {blocks.map((block) => (
          <BlockCard key={block._id} block={block} onDelete={onDelete} />
        ))}
      </ContentRevealStagger>
    </SurfaceSection>
  );
}

