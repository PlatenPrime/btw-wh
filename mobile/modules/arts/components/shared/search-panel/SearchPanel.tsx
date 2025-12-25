import { View, TextInput } from "react-native";
import { Icon } from "@/components/ui/icon";
import { useThemeColors } from "@/hooks/use-theme-colors";
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
  const { dialog, text, placeholder: placeholderColor } = useThemeColors();
  const iconColor = useIconColor();

  const bgColor = dialog.bg;
  const borderColor = dialog.border;
  const textColor = text.primary;

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
