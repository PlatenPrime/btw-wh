import { ThemedIcon, ThemedPressable } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import React from "react";
import { HeaderAction } from "../../types";

interface RenderActionItemViewProps {
  action: HeaderAction;
  iconColor: string;
  finalTextColorClass: string;
  handlePress: () => void;
}

export function RenderActionItemView({
  action,
  iconColor,
  finalTextColorClass,
  handlePress,
}: RenderActionItemViewProps) {
  return (
    <ThemedPressable
      key={action.id}
      onPress={handlePress}
      className="flex-row items-center p-3"
    >
      {action.icon && (
        <ThemedIcon
          family="MaterialIcons"
          name={action.icon}
          size={20}
          color={iconColor}
          className="mr-3"
        />
      )}
      <ThemedText type="default" className={finalTextColorClass}>
        {action.label}
      </ThemedText>
    </ThemedPressable>
  );
}
