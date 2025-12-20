import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColorScheme } from "@/hooks/use-color-scheme";

interface PosInfoItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  value: string | number;
  isError?: boolean;
}

export function PosInfoItem({ icon, value, isError }: PosInfoItemProps) {
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.1)";
  const errorBgColor = colorScheme === "light" ? "rgba(239, 68, 68, 0.1)" : "rgba(127, 29, 29, 0.3)";
  const textColor = isError ? "#ef4444" : undefined;
  const iconColor = textColor || (colorScheme === "light" ? "#374151" : "#d1d5db");

  return (
    <View
      className="flex-row items-center justify-center gap-1 rounded-lg px-2 py-1"
      style={{
        backgroundColor: isError ? errorBgColor : bgColor,
      }}
    >
      <MaterialIcons name={icon} size={12} color={iconColor} />
      <ThemedText
        type="default"
        className="text-xs font-medium"
        style={{ color: textColor }}
        numberOfLines={1}
      >
        {value}
      </ThemedText>
    </View>
  );
}

