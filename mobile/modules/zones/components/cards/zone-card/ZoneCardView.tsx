import { GlassCard } from "@/components/shared/glass-card";
import { ThemedBox, ThemedHStack, ThemedPressable, ThemedText } from "@/components/themed";
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
    <GlassCard className="p-4">
      <ThemedHStack className="items-center justify-between">
        <ThemedPressable onPress={onPress} className="flex-1">
          <ThemedBox className="flex-1 min-w-0 gap-2">
            <ThemedText type="title" className="text-xl">
              {title}
            </ThemedText>
            <ThemedBox className="gap-1">
              <ThemedText type="default" className="text-sm text-typography-500">
                Штрих-код: {bar}
              </ThemedText>
              <ThemedText type="default" className="text-sm text-typography-500">
                Сектор: {sector}
              </ThemedText>
            </ThemedBox>
          </ThemedBox>
        </ThemedPressable>
        {menu && <View>{menu}</View>}
      </ThemedHStack>
    </GlassCard>
  );
}

