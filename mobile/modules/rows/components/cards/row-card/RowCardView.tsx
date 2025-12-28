import { ThemedText } from "@/components/themed-text";
import { Box, HStack, Pressable } from "@/components/ui";
import { View } from "react-native";

interface RowCardViewProps {
  title: string;

  onPress: () => void;
  menu?: React.ReactNode;
}

export function RowCardView({
  title,

  onPress,
  menu,
}: RowCardViewProps) {
  return (
    <View className="p-4 rounded-lg border border-outline-100 bg-background-0">
      <HStack className="items-center justify-between">
        <Pressable onPress={onPress} className="flex-1">
          <Box className="flex-1 min-w-0 items-center">
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
