import { View, TextInput } from "react-native";
import { Icon } from "@/components/ui/icon";
import { useTheme } from "@/providers/theme-provider";
import { Colors, SemanticColors } from "@/constants/theme";
import { useIconColor } from "@/hooks/use-icon-color";

interface SearchPanelProps {
  search: string;
  onSearchChange: (text: string) => void;
  placeholder?: string;
}

export function SearchPanel({
  search,
  onSearchChange,
  placeholder = "Пошук артикулів...",
}: SearchPanelProps) {
  const { resolvedTheme } = useTheme();
  const iconColor = useIconColor();

  const bgColor = resolvedTheme === "light" ? SemanticColors.dialog.bg.light : SemanticColors.dialog.bg.dark;
  const borderColor = resolvedTheme === "light" ? SemanticColors.dialog.border.light : SemanticColors.dialog.border.dark;
  const textColor = resolvedTheme === "light" ? Colors.light.text : Colors.dark.text;
  const placeholderColor = resolvedTheme === "light" ? SemanticColors.placeholder.light : SemanticColors.placeholder.dark;

  return (
    <View
      className="flex-row items-center rounded-lg border px-3"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <Icon family="MaterialIcons" name="search" size={20} color={iconColor} />
      <TextInput
        value={search}
        onChangeText={onSearchChange}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        className="flex-1 py-3 px-2"
        style={{
          color: textColor,
          fontSize: 16,
        }}
      />
    </View>
  );
}
