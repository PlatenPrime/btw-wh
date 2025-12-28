import type { SegmentDto } from "@/modules/blocks/api/types";
import { useRouter } from "expo-router";
import { SegmentCardView } from "./SegmentCardView";

interface SegmentCardProps {
  segment: SegmentDto;
  blockId: string;
}

export function SegmentCard({ segment, blockId }: SegmentCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(
      `/(tabs)/warehouse/blocks/${blockId}/segments/${segment._id}` as any
    );
  };

  const zoneTitles = segment.zones.map((zone) => zone.title).join(", ");

  return (
    <SegmentCardView
      title={zoneTitles || `Сегмент ${segment.order}`}
      order={segment.order}
      sector={segment.sector}
      onPress={handlePress}
    />
  );
}
