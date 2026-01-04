import { ThemedText } from "@/components/themed/themed-text";
import { ThemedBox } from "@/components/themed";
import { ThemedIcon } from "@/components/themed";
import type { IconFamily } from "@/components/types";
import { SemanticColors } from "@/constants/theme";
import { useIconColor } from "@/hooks/use-icon-color";

interface PosInfoItemProps {
  icon: string;
  value: string | number;
  isError?: boolean;
  iconFamily?: IconFamily;
}

export function PosInfoItem({
  icon,
  value,
  isError,
  iconFamily = "MaterialIcons",
}: PosInfoItemProps) {
  const iconColor = useIconColor();

  return (
    <ThemedBox
      className={`flex-row items-center justify-center gap-2 rounded-lg p-1 ${
        isError ? "bg-error-50" : "bg-background-100/50"
      }`}
    >
      <ThemedIcon
        family={iconFamily}
        name={icon}
        size="sm"
        color={isError ? SemanticColors.destructive : iconColor}
      />
      <ThemedText
        type="default"
        className={`text-sm font-medium ${isError ? "text-error-600" : ""}`}
        numberOfLines={1}
      >
        {value}
      </ThemedText>
    </ThemedBox>
  );
}
