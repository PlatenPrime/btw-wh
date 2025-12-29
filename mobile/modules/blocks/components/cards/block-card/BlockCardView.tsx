import { ThemedText } from "@/components/themed-text";
import { Box, HStack, Pressable } from "@/components/ui";
import { View } from "react-native";

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
              Порядок:
            </ThemedText>
            <ThemedText type="default" className="text-sm">
              {order}
            </ThemedText>
          </HStack>
       
          <HStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Сегментів:
            </ThemedText>
            <ThemedText type="default" className="text-sm">
              {segmentsCount}
            </ThemedText>
          </HStack>
        </Box>
      </Box>
    </Pressable>
  );
}

