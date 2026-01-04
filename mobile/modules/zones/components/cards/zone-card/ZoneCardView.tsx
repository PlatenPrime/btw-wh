import { ThemedText } from "@/components/themed/themed-text";
import { Box, HStack, Pressable } from "@/components/ui";
import { View } from "react-native";

interface ZoneCardViewProps {
  title: string;
  bar: number;
  sector: number;
  onPress?: () => void;
  menu?: React.ReactNode;
}

export function ZoneCardView({
  title,
  bar,
  sector,
  onPress,
  menu,
}: ZoneCardViewProps) {
  return (
    <View className="p-4 rounded-lg border border-outline-100 bg-background-0">
      <HStack className="items-center justify-between">
        <Pressable onPress={onPress} className="flex-1">
          <Box className="flex-1 min-w-0 gap-2">
            <ThemedText type="title" className="text-xl">
              {title}
            </ThemedText>
            <Box className="gap-1">
              <ThemedText type="default" className="text-sm text-typography-500">
                Штрих-код: {bar}
              </ThemedText>
              <ThemedText type="default" className="text-sm text-typography-500">
                Сектор: {sector}
              </ThemedText>
            </Box>
          </Box>
        </Pressable>
        {menu && <View>{menu}</View>}
      </HStack>
    </View>
  );
}

