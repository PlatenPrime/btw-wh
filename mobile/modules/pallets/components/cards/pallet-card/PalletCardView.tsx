import {
  ThemedBox,
  ThemedHStack,
  ThemedIcon,
  ThemedPressable,
} from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { cn } from "@/lib/utils";
import { View } from "react-native";

interface PalletCardViewProps {
  title: string;
  sector?: string;
  isEmpty: boolean;
  isDef: boolean;
  onPress: () => void;
  menu?: React.ReactNode;
  iconColor: string;
}

export function PalletCardView({
  title,
  sector,
  isEmpty,
  isDef,
  onPress,
  menu,
  iconColor,
}: PalletCardViewProps) {
  const containerColor = isEmpty ? "bg-rose-500/10" : "bg-background-0";
  const containerBorderColor = isEmpty
    ? "border-rose-500/25"
    : "border-outline-100";
  return (
    <ThemedPressable
      onPress={onPress}
      className={cn(
        "p-4 rounded-lg border",
        containerColor,
        containerBorderColor
      )}
    >
      <ThemedBox className="gap-2">
        <ThemedHStack className="items-center justify-between">
          <ThemedText type="title" className="text-lg flex-1">
            {title}
          </ThemedText>
          <ThemedHStack className="items-center gap-2">
            {isEmpty && (
              <ThemedBox className="rounded-md px-2 py-1 bg-background-100">
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
            <ThemedIcon
              family="Feather"
              name="map-pin"
              size={14}
              color={iconColor}
            />
            <ThemedText type="default" className="text-sm text-typography-700">
              {sector ?? "Немає"}
            </ThemedText>
          </ThemedHStack>

          <ThemedHStack className="items-center justify-start gap-2">
            <ThemedIcon
              family="Feather"
              name="bar-chart"
              size={14}
              color={iconColor}
            />
            <ThemedText type="default" className="text-sm text-typography-700">
              {isDef ? "Так" : "Ні"}
            </ThemedText>
          </ThemedHStack>
        </ThemedBox>
      </ThemedBox>
    </ThemedPressable>
  );
}
