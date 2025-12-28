import type { BlockDto } from "@/modules/blocks/api/types";
import { BlockInfoView } from "./BlockInfoView";

interface BlockInfoProps {
  block: BlockDto;
}

export function BlockInfo({ block }: BlockInfoProps) {
  return (
    <BlockInfoView
      title={block.title}
      order={block.order}
      segmentsCount={block.segs.length}
    />
  );
}

