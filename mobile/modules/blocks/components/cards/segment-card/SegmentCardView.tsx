import { GlassCard } from "@/components/shared/glass-card";
import { ThemedBox, ThemedHStack, ThemedPressable, ThemedText } from "@/components/themed";

interface SegmentCardViewProps {
  title: string;
  order: number;
  sector: number;
  onPress: () => void;
}

export function SegmentCardView({
  title,
  order,
  sector,
  onPress,
}: SegmentCardViewProps) {
  return (
    <GlassCard className="p-4">
      <ThemedPressable onPress={onPress}>
      <ThemedBox className="gap-2">
        <ThemedHStack className="items-center justify-between">
          <ThemedText type="title" className="text-lg flex-1">
            {title}
          </ThemedText>
        </ThemedHStack>
        <ThemedBox className="gap-1">
          <ThemedHStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Сегмент:
            </ThemedText>
            <ThemedText type="default" className="text-sm">
              {order}
            </ThemedText>
          </ThemedHStack>

          <ThemedHStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Сектор:
            </ThemedText>
            <ThemedText type="default" className="text-sm">
              {sector}
            </ThemedText>
          </ThemedHStack>
        </ThemedBox>
      </ThemedBox>
      </ThemedPressable>
    </GlassCard>
  );
}
