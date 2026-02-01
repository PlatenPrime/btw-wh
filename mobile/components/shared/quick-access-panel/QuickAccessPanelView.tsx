import { GlassCard } from "@/components/shared/glass-card";
import {
  ThemedIcon,
  ThemedPressable,
  ThemedText,
  ThemedVStack,
} from "@/components/themed";
import type { IconFamily } from "@/components/types";
import { SemanticColors } from "@/constants/theme";
import { hexToRgba } from "@/utils/color-utils";
import Animated, { FadeInLeft } from "react-native-reanimated";
import type { QuickAccessTrigger } from "./types";

interface QuickAccessPanelViewProps {
  triggers: QuickAccessTrigger[];
}

export function QuickAccessPanelView({ triggers }: QuickAccessPanelViewProps) {
  if (triggers.length === 0) {
    return null;
  }

  return (
    <GlassCard className="p-5">
      <ThemedVStack className="gap-4">
      <ThemedText
        type="defaultSemiBold"
        className="text-center text-lg text-typography-900"
      >
        Панель швидкого доступу
      </ThemedText>
      <ThemedVStack className="gap-3">
        {triggers.map((trigger, index) => {
          const colorHex = SemanticColors.iconColors[trigger.color];
          const backgroundColor = hexToRgba(colorHex, 0.15);
          const borderColor = hexToRgba(colorHex, 0.9);

          return (
            <Animated.View
              key={trigger.id}
              entering={FadeInLeft.springify()
                .damping(22)
                .stiffness(280)
                .delay(100 + index * 60)}
            >
              <ThemedPressable
                onPress={trigger.onPress}
                className="flex-row items-center rounded-xl p-5"
                style={{
                  backgroundColor,
                  borderWidth: 1,
                  borderColor,
                }}
              >
                <ThemedIcon
                  family={(trigger.iconFamily || "MaterialIcons") as IconFamily}
                  name={trigger.icon}
                  size={24}
                  color={colorHex}
                />
                <ThemedText
                  type="defaultSemiBold"
                  className="ml-3 flex-1 text-base"
                >
                  {trigger.title}
                </ThemedText>
              </ThemedPressable>
            </Animated.View>
          );
        })}
      </ThemedVStack>
      </ThemedVStack>
    </GlassCard>
  );
}
