import { ThemedText } from "@/components/themed/themed-text";
import { ThemedBox, ThemedHStack, ThemedPressable } from "@/components/themed";

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
    <ThemedPressable
      onPress={onPress}
      className="p-4 rounded-lg border border-outline-100 bg-background-0"
    >
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
  );
}
