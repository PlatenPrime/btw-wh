import { GlassCard } from "@/components/shared/glass-card";
import { ThemedBox, ThemedHStack, ThemedPressable, ThemedText } from "@/components/themed";

interface BlockCardViewProps {
  title: string;
  order: number;
  segmentsCount: number;
  onPress: () => void;
}

export function BlockCardView({
  title,
  order,
  segmentsCount,
  onPress,
}: BlockCardViewProps) {
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
              Порядок:
            </ThemedText>
            <ThemedText type="default" className="text-sm">
              {order}
            </ThemedText>
          </ThemedHStack>
       
          <ThemedHStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Сегментів:
            </ThemedText>
            <ThemedText type="default" className="text-sm">
              {segmentsCount}
            </ThemedText>
          </ThemedHStack>
        </ThemedBox>
      </ThemedBox>
      </ThemedPressable>
    </GlassCard>
  );
}

