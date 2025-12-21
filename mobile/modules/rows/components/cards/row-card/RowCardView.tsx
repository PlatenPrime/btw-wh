import { ThemedText } from "@/components/themed-text";
import { Pressable, Box, HStack } from "@/components/ui";
import { View } from "react-native";

interface RowCardViewProps {
  title: string;
  palletsCount: number;
  onPress: () => void;
  menu?: React.ReactNode;
}

export function RowCardView({
  title,
  palletsCount,
  onPress,
  menu,
}: RowCardViewProps) {
  return (
    <View className="p-4 rounded-lg border border-outline-200 bg-background-0">
      <HStack className="items-center justify-between">
        <Pressable onPress={onPress} className="flex-1">
          <Box className="items-center">
            <ThemedText type="title" className="text-xl ">
              {title}
            </ThemedText>
          </Box>
        </Pressable>
        {menu && <View>{menu}</View>}
      </HStack>
    </View>
  );
}

