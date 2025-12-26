import { ThemedText } from "@/components/themed-text";
import { Pressable, Box, HStack } from "@/components/ui";

interface PalletCardViewProps {
  title: string;
  sector?: string;
  isEmpty: boolean;
  isDef: boolean;
  onPress: () => void;
}

export function PalletCardView({
  title,
  sector,
  isEmpty,
  isDef,
  onPress,
}: PalletCardViewProps) {
  return (
    <Pressable
      onPress={onPress}
      className="p-4 rounded-lg border border-outline-200 bg-background-0"
    >
      <Box className="gap-2">
        <HStack className="items-center justify-between">
          <ThemedText type="title" className="text-lg">
            {title}
          </ThemedText>
          {isEmpty && (
            <Box className="rounded-md px-2 py-1 bg-background-200">
              <ThemedText type="default" className="text-xs">
                порожня
              </ThemedText>
            </Box>
          )}
        </HStack>
        <Box className="gap-1">
          <HStack className="items-center justify-between">
            <ThemedText type="default" className="text-xs">
              Сектор:
            </ThemedText>
            <ThemedText type="default" className="text-xs">
              {sector ?? "Немає"}
            </ThemedText>
          </HStack>
          <Box className="h-px bg-outline-200 my-1" />
          <HStack className="items-center justify-between">
            <ThemedText type="default" className="text-xs">
              Аналіз:
            </ThemedText>
            <ThemedText type="default" className="text-xs">
              {isDef ? "Так" : "Ні"}
            </ThemedText>
          </HStack>
        </Box>
        <Box className="h-px bg-outline-200 my-1" />
      </Box>
    </Pressable>
  );
}

