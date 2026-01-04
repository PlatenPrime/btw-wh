import { Box, VStack, HStack } from "@/components/ui";
import { ThemedView } from "@/components/themed/themed-view";

export function PosesByArtikulContainerSkeleton() {
  return (
    <VStack className="gap-4">
      {/* Позиции по складам */}
      <VStack className="gap-4">
        {/* Погреби */}
        <ThemedView className="p-4 rounded-lg border border-outline-100">
          <VStack className="gap-2">
            <HStack className="items-center justify-between">
              <Box className="h-5 w-16 bg-background-200 rounded" />
              <Box className="h-5 w-8 bg-background-200 rounded" />
              <Box className="h-5 w-8 bg-background-200 rounded" />
            </HStack>
            <VStack className="gap-2">
              {[1, 2, 3].map((i) => (
                <Box key={i} className="h-8 w-full bg-background-200 rounded-md" />
              ))}
            </VStack>
          </VStack>
        </ThemedView>

        {/* Мережі */}
        <ThemedView className="p-4 rounded-lg border border-outline-100">
          <VStack className="gap-2">
            <HStack className="items-center justify-between">
              <Box className="h-5 w-16 bg-background-200 rounded" />
              <Box className="h-5 w-8 bg-background-200 rounded" />
              <Box className="h-5 w-8 bg-background-200 rounded" />
            </HStack>
            <VStack className="gap-2">
              {[1, 2].map((i) => (
                <Box key={i} className="h-8 w-full bg-background-200 rounded-md" />
              ))}
            </VStack>
          </VStack>
        </ThemedView>
      </VStack>
    </VStack>
  );
}

