import { ThemedText } from "@/components/themed-text";
import { Box, HStack, VStack } from "@/components/ui";

interface BlockInfoViewProps {
  title: string;
  order: number;
  segmentsCount: number;
}

export function BlockInfoView({
  title,
  order,
  segmentsCount,
}: BlockInfoViewProps) {
  return (
    <Box className="p-4 rounded-lg border border-outline-100 bg-background-0">
      <VStack className="gap-2">
        <ThemedText type="title" className="text-xl">
          {title}
        </ThemedText>
        <Box className="gap-1">
          <HStack className="items-center justify-between">
            <ThemedText type="default" className="text-sm">
              Порядок:
            </ThemedText>
            <ThemedText type="defaultSemiBold" className="text-sm">
              {order}
            </ThemedText>
          </HStack>
          <Box className="h-px bg-outline-200 my-1" />
          <HStack className="items-center justify-between">
            <ThemedText type="default" className="text-sm">
              Сегментів:
            </ThemedText>
            <ThemedText type="defaultSemiBold" className="text-sm">
              {segmentsCount}
            </ThemedText>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}

