import { ThemedText } from "@/components/themed-text";
import { Icon, Pressable } from "@/components/ui";
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
    <Pressable
      key={action.id}
      onPress={handlePress}
      className="flex-row items-center p-3"
    >
      {action.icon && (
        <Icon
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
    </Pressable>
  );
}
