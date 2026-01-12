import { ThemedBox, ThemedHStack, ThemedPressable } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
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
    <View className="p-2 rounded-lg border  border-outline-100 bg-background-0">
      <ThemedHStack className="items-center justify-between">
        <ThemedPressable onPress={onPress} className="flex-1">
          <ThemedBox className="flex-1 min-w-0 items-center justify-center ">
            <ThemedText type="title" className="text-xl">
              {title}
            </ThemedText>
          </ThemedBox>
        </ThemedPressable>
        {menu && <View>{menu}</View>}
      </ThemedHStack>
    </View>
  );
}
