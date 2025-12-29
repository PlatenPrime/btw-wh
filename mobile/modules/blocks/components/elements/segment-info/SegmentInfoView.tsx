import { ThemedText } from "@/components/themed-text";
import { Box, HStack, VStack } from "@/components/ui";

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
    <Box className="p-4 rounded-lg border border-outline-100 bg-background-0">
      <VStack className="gap-2">
        <ThemedText type="title" className="text-lg text-center">
          Сегмент {order}
        </ThemedText>
        <Box className="gap-1">
          <HStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Блок:
            </ThemedText>
            <ThemedText type="defaultSemiBold" className="text-sm">
              {blockTitle}
            </ThemedText>
          </HStack>

          <HStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Порядок:
            </ThemedText>
            <ThemedText type="defaultSemiBold" className="text-sm">
              {order}
            </ThemedText>
          </HStack>

          <HStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Сектор:
            </ThemedText>
            <ThemedText type="defaultSemiBold" className="text-sm">
              {sector}
            </ThemedText>
          </HStack>

          <HStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Зони:
            </ThemedText>
            <ThemedText type="defaultSemiBold" className="text-sm">
              {zonesCount}
            </ThemedText>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}

