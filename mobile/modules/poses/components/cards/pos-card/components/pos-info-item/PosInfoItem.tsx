import { Box, HStack } from "@/components/ui";
import { ThemedText } from "@/components/themed-text";
import { Icon } from "@/components/ui/icon";
import { useIconColor } from "@/hooks/use-icon-color";
import { SemanticColors } from "@/constants/theme";

interface PosInfoItemProps {
  icon: string;
  value: string | number;
  isError?: boolean;
}

export function PosInfoItem({ icon, value, isError }: PosInfoItemProps) {
  const iconColor = useIconColor();
  
  return (
    <Box
      className={`flex-row items-center justify-center gap-1 rounded-lg px-2 py-1 ${
        isError ? "bg-error-50" : "bg-background-100"
      }`}
    >
      <Icon
        family="MaterialIcons"
        name={icon}
        size={12}
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

