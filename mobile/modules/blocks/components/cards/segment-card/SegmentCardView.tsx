import { ThemedText } from "@/components/themed-text";
import { Box, HStack, Pressable } from "@/components/ui";

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
    <Pressable
      onPress={onPress}
      className="p-4 rounded-lg border border-outline-100 bg-background-0"
    >
      <Box className="gap-2">
        <HStack className="items-center justify-between">
          <ThemedText type="title" className="text-lg flex-1">
            {title}
          </ThemedText>
        </HStack>
        <Box className="gap-1">
          <HStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Сегмент:
            </ThemedText>
            <ThemedText type="default" className="text-sm">
              {order}
            </ThemedText>
          </HStack>

          <HStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Сектор:
            </ThemedText>
            <ThemedText type="default" className="text-sm">
              {sector}
            </ThemedText>
          </HStack>
        </Box>
      </Box>
    </Pressable>
  );
}
