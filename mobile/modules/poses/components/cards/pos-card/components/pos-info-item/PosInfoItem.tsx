import { ThemedText } from "@/components/themed-text";
import { Box } from "@/components/ui";
import { Icon, type IconFamily } from "@/components/ui/icon";
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
    <Box
      className={`flex-row items-center justify-center gap-2 rounded-lg px-2 py-1 ${
        isError ? "bg-error-50" : "bg-background-100"
      }`}
    >
      <Icon
        family={iconFamily}
        name={icon}
        size="xs"
        color={isError ? SemanticColors.destructive : iconColor}
      />
      <ThemedText
        type="default"
        className={`text-xs font-medium ${isError ? "text-error-600" : ""}`}
        numberOfLines={1}
      >
        {value}
      </ThemedText>
    </Box>
  );
}
