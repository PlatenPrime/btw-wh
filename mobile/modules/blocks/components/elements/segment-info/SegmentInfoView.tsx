import { GlassCard } from "@/components/shared/glass-card";
import { ThemedBox, ThemedHStack, ThemedText, ThemedVStack } from "@/components/themed";

interface SegmentInfoViewProps {
  order: number;
  sector: number;
  zonesCount: number;
  blockTitle: string;
}

export function SegmentInfoView({
  order,
  sector,
  zonesCount,
  blockTitle,
}: SegmentInfoViewProps) {
  return (
    <GlassCard className="p-4">
      <ThemedVStack className="gap-2">
        <ThemedText type="title" className="text-lg text-center">
          Сегмент {order}
        </ThemedText>
        <ThemedBox className="gap-1">
          <ThemedHStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Блок:
            </ThemedText>
            <ThemedText type="defaultSemiBold" className="text-sm">
              {blockTitle}
            </ThemedText>
          </ThemedHStack>

          <ThemedHStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Порядок:
            </ThemedText>
            <ThemedText type="defaultSemiBold" className="text-sm">
              {order}
            </ThemedText>
          </ThemedHStack>

          <ThemedHStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Сектор:
            </ThemedText>
            <ThemedText type="defaultSemiBold" className="text-sm">
              {sector}
            </ThemedText>
          </ThemedHStack>

          <ThemedHStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Зони:
            </ThemedText>
            <ThemedText type="defaultSemiBold" className="text-sm">
              {zonesCount}
            </ThemedText>
          </ThemedHStack>
        </ThemedBox>
      </ThemedVStack>
    </GlassCard>
  );
}

