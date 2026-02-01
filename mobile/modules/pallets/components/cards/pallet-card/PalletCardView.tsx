import { ThemedBox, ThemedHStack } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils";
import { Pressable, View } from "react-native";

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
  return (
    <Pressable onPress={onPress}>
      <GlassCard
        className={cn("p-4", isEmpty && "border-rose-500/25")}
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
        </ThemedBox>
      </GlassCard>
    </Pressable>
  );
}
