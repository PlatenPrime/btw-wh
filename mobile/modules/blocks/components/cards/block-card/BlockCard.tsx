import type { BlockDto } from "@/modules/blocks/api/types";
import { useRouter } from "expo-router";
import { BlockCardView } from "./BlockCardView";

interface BlockCardProps {
  block: BlockDto;
}

export function BlockCard({ block }: BlockCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/(tabs)/warehouse/blocks/${block._id}` as any);
  };

  return (
    <BlockCardView
      title={block.title}
      order={block.order}
      segmentsCount={block.segs.length}
      onPress={handlePress}
    />
  );
}

