import { View } from "react-native";
import { SearchPanel } from "@/modules/arts/components/shared/search-panel/SearchPanel";
import { Box, Button, HStack, Text } from "@/components/ui";
import { Icon } from "@/components/ui/icon";
import { ThemedText } from "@/components/themed-text";
import { useIconColor } from "@/hooks/use-icon-color";
import { useState } from "react";
import { Modal, TouchableWithoutFeedback, Pressable } from "react-native";
import { SemanticColors } from "@/constants/theme";

interface ZonesControlsProps {
  search: string;
  onSearchChange: (search: string) => void;
  sortBy: "title" | "bar" | "sector" | "createdAt";
  onSortByChange: (sortBy: "title" | "bar" | "sector" | "createdAt") => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (sortOrder: "asc" | "desc") => void;
}

const sortOptions: Array<{
  value: "title" | "bar" | "sector" | "createdAt";
  label: string;
}> = [
  { value: "title", label: "Назва" },
  { value: "bar", label: "Штрих-код" },
  { value: "sector", label: "Сектор" },
  { value: "createdAt", label: "Дата створення" },
];

export function ZonesControls({
  search,
  onSearchChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
}: ZonesControlsProps) {
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const iconColor = useIconColor();
  const currentSortLabel = sortOptions.find((opt) => opt.value === sortBy)?.label || "Сектор";

  return (
    <Box className="p-2 gap-2 border-b border-outline-100">
      <SearchPanel
        search={search}
        onSearchChange={onSearchChange}
        placeholder="Пошук за назвою..."
      />
      
      <HStack className="items-center justify-between gap-2">
        <Pressable
          onPress={() => setSortModalVisible(true)}
          className="flex-row items-center gap-2 flex-1 border border-outline-100 rounded-lg p-3"
        >
          <Icon family="MaterialIcons" name="sort" size={20} color={iconColor} />
          <ThemedText type="default" className="text-sm flex-1">
            Сортування: {currentSortLabel}
          </ThemedText>
          <Icon family="MaterialIcons" name="arrow-drop-down" size={20} color={iconColor} />
        </Pressable>

        <Button
          onPress={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
          variant="outline"
          className="px-3"
        >
          <Icon
            family="MaterialIcons"
            name={sortOrder === "asc" ? "arrow-upward" : "arrow-downward"}
            size={20}
            color={iconColor}
          />
        </Button>
      </HStack>

      <Modal
        visible={sortModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setSortModalVisible(false)}>
          <View className="flex-1 bg-black/50 items-center justify-center">
            <TouchableWithoutFeedback>
              <Box className="min-w-[250px] rounded-xl border border-outline-100 bg-background-0 p-2 shadow-lg">
                <ThemedText type="defaultSemiBold" className="text-sm p-3 border-b border-outline-100">
                  Виберіть поле для сортування
                </ThemedText>
                {sortOptions.map((option) => (
                  <Pressable
                    key={option.value}
                    onPress={() => {
                      onSortByChange(option.value);
                      setSortModalVisible(false);
                    }}
                    className={`flex-row items-center p-3 ${
                      sortBy === option.value ? "bg-background-200" : ""
                    }`}
                  >
                    <Icon
                      family="MaterialIcons"
                      name={sortBy === option.value ? "check" : "radio-button-unchecked"}
                      size={20}
                      color={sortBy === option.value ? SemanticColors.primary : iconColor}
                    />
                    <ThemedText
                      type="default"
                      className={`text-sm ml-2 ${
                        sortBy === option.value ? "font-semibold" : ""
                      }`}
                    >
                      {option.label}
                    </ThemedText>
                  </Pressable>
                ))}
              </Box>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Box>
  );
}

