import { View, TextInput } from "react-native";
import { ArtsGridSkeleton } from "@/modules/arts/components/lists/arts-grid/ArtsGridSkeleton";
import { useColorScheme } from "@/hooks/use-color-scheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/theme";

export function ArtsContainerSkeleton() {
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "light" ? "#fff" : "#1f2937";
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";
  const placeholderColor = colorScheme === "light" ? "#9ca3af" : "#6b7280";

  return (
    <View className="flex-1">
      <View className="px-4 pt-2 pb-2">
        <View
          className="flex-row items-center rounded-lg border px-3"
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
          }}
        >
          <MaterialIcons name="search" size={20} color={placeholderColor} />
          <TextInput
            value=""
            editable={false}
            placeholder="Пошук артикулів..."
            placeholderTextColor={placeholderColor}
            className="flex-1 py-3 px-2"
            style={{
              color: Colors[colorScheme].text,
              fontSize: 16,
            }}
          />
        </View>
      </View>
      <View className="flex-1">
        <ArtsGridSkeleton />
      </View>
    </View>
  );
}
