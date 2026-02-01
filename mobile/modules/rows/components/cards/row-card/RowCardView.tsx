import { GlassCard } from "@/components/shared/glass-card";
import { ThemedBox, ThemedHStack, ThemedPressable, ThemedText } from "@/components/themed";
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
    <GlassCard className="p-3">
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
    </GlassCard>
  );
}
