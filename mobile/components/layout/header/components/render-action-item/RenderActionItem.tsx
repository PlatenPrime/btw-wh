import { SemanticColors } from "@/constants/theme";
import { useIconColor } from "@/hooks/use-icon-color";
import React from "react";
import { textColorMap } from "../../constants/text-color-map";
import { HeaderAction } from "../../types";
import { RenderActionItemView } from "./RenderActionItemView";

interface RenderActionItemProps {
  action: HeaderAction;
  textColorClass: string;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const iconColorMap: Record<string, string | undefined> = {
  ...SemanticColors.iconColors,
  default: undefined,
};

export function RenderActionItem({
  action,
  textColorClass,
  setModalVisible,
}: RenderActionItemProps) {
  const handleActionClick = (onClick: () => void) => {
    setModalVisible(false);
    setTimeout(() => {
      onClick();
    }, 100);
  };

  const defaultIconColor = useIconColor();

  const iconColor =
    iconColorMap[action.iconColor || "default"] || defaultIconColor;
  const finalTextColorClass =
    textColorMap[action.textColor || "default"] ?? textColorClass;

  return (
    <RenderActionItemView
      action={action}
      iconColor={iconColor}
      finalTextColorClass={finalTextColorClass}
      handlePress={() => handleActionClick(action.onClick)}
    />
  );
}
