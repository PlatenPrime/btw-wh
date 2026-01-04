import { ThemedText } from "@/components/themed/themed-text";
import { ThemedBox, ThemedHStack, ThemedPressable } from "@/components/themed";
import { View } from "react-native";

interface PalletCardViewProps {
  title: string;
  sector?: string;
  isEmpty: boolean;
  isDef: boolean;
  onPress: () => void;
  menu?: React.ReactNode;
}

export function PalletCardView({
  title,
  sector,
  isEmpty,
  isDef,
  onPress,
  menu,
}: PalletCardViewProps) {
  return (
    <ThemedPressable
      onPress={onPress}
      className="p-4 rounded-lg border border-outline-100 bg-background-0"
    >
      <ThemedBox className="gap-2">
        <ThemedHStack className="items-center justify-between">
          <ThemedText type="title" className="text-lg flex-1">
            {title}
          </ThemedText>
          <ThemedHStack className="items-center gap-2">
            {isEmpty && (
              <ThemedBox className="rounded-md px-2 py-1 bg-background-200">
                <ThemedText type="default" className="text-sm">
                  порожня
                </ThemedText>
              </ThemedBox>
            )}
            {menu && <View>{menu}</View>}
          </ThemedHStack>
        </ThemedHStack>
        <ThemedBox className="gap-1">
          <ThemedHStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Сектор:
            </ThemedText>
            <ThemedText type="default" className="text-sm">
              {sector ?? "Немає"}
            </ThemedText>
          </ThemedHStack>

          <ThemedHStack className="items-center justify-start gap-2">
            <ThemedText type="default" className="text-sm">
              Аналіз:
            </ThemedText>
            <ThemedText type="default" className="text-sm">
              {isDef ? "Так" : "Ні"}
            </ThemedText>
          </ThemedHStack>
        </ThemedBox>
      </ThemedBox>
    </ThemedPressable>
  );
}
