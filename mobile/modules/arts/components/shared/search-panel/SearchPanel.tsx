import { View, TextInput } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

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
  const colorScheme = useColorScheme() ?? "light";

  const bgColor = colorScheme === "light" ? "#fff" : "#1f2937";
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";
  const textColor = colorScheme === "light" ? Colors.light.text : Colors.dark.text;
  const placeholderColor = colorScheme === "light" ? "#9ca3af" : "#6b7280";

  return (
    <View
      className="flex-row items-center rounded-lg border px-3"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <MaterialIcons name="search" size={20} color={placeholderColor} />
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
