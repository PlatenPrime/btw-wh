import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { GetPosesByPalletIdParams } from "@/modules/poses/api/services/queries/getPosesByPalletId";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";

interface PalletSortControlsViewProps {
  sortParams: GetPosesByPalletIdParams;
  modalVisible: boolean;
  onModalVisibleChange: (visible: boolean) => void;
  onSortByChange: (value: "artikul" | "updatedAt") => void;
  onSortOrderChange: (value: "asc" | "desc") => void;
  currentSortBy:
    | {
        value: "artikul" | "updatedAt";
        label: string;
        icon: keyof typeof MaterialIcons.glyphMap;
      }
    | undefined;
  currentSortOrder:
    | {
        value: "asc" | "desc";
        label: string;
        icon: keyof typeof MaterialIcons.glyphMap;
      }
    | undefined;
  sortByOptions: {
    value: "artikul" | "updatedAt";
    label: string;
    icon: keyof typeof MaterialIcons.glyphMap;
  }[];
  sortOrderOptions: {
    value: "asc" | "desc";
    label: string;
    icon: keyof typeof MaterialIcons.glyphMap;
  }[];
  textColor: string;
  bgColor: string;
  borderColor: string;
  modalBgColor: string;
  itemBgColor: string;
  selectedBgColor: string;
}

export function PalletSortControlsView({
  sortParams,
  modalVisible,
  onModalVisibleChange,
  onSortByChange,
  onSortOrderChange,
  currentSortBy,
  currentSortOrder,
  sortByOptions,
  sortOrderOptions,
  textColor,
  bgColor,
  borderColor,
  modalBgColor,
  itemBgColor,
  selectedBgColor,
}: PalletSortControlsViewProps) {
  return (
    <>
      <TouchableOpacity
        onPress={() => onModalVisibleChange(true)}
        className="flex-row items-center gap-2 px-3 py-2 rounded-lg border"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
        activeOpacity={0.7}
      >
        <MaterialIcons
          name={currentSortBy?.icon || "sort"}
          size={18}
          color={textColor}
        />
        <ThemedText type="default" className="text-sm">
          {currentSortBy?.label}
        </ThemedText>
        <MaterialIcons
          name={currentSortOrder?.icon || "arrow-downward"}
          size={18}
          color={textColor}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => onModalVisibleChange(false)}
      >
        <Pressable
          className="flex-1 justify-center items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onPress={() => onModalVisibleChange(false)}
        >
          <Pressable
            className="w-full max-w-md mx-4"
            onPress={(e) => e.stopPropagation()}
          >
            <ThemedView
              className="rounded-xl p-6 border"
              style={{
                backgroundColor: modalBgColor,
                borderColor: borderColor,
              }}
            >
              <View className="flex-row items-center justify-between mb-4">
                <ThemedText type="defaultSemiBold" className="text-lg">
                  Сортування
                </ThemedText>
                <TouchableOpacity
                  onPress={() => onModalVisibleChange(false)}
                  className="p-2"
                  activeOpacity={0.7}
                >
                  <MaterialIcons name="close" size={24} color={textColor} />
                </TouchableOpacity>
              </View>

              <View className="gap-4">
                <View className="gap-2">
                  <ThemedText
                    type="default"
                    className="text-sm mb-1"
                    style={{ color: textColor }}
                  >
                    Сортувати по:
                  </ThemedText>
                  {sortByOptions.map((option) => {
                    const isSelected =
                      option.value === (sortParams.sortBy || "updatedAt");
                    return (
                      <TouchableOpacity
                        key={option.value}
                        onPress={() => {
                          onSortByChange(option.value);
                          onModalVisibleChange(false);
                        }}
                        className="flex-row items-center gap-3 p-3 rounded-lg"
                        style={{
                          backgroundColor: isSelected
                            ? selectedBgColor
                            : itemBgColor,
                        }}
                        activeOpacity={0.7}
                      >
                        <MaterialIcons
                          name={option.icon}
                          size={22}
                          color={textColor}
                        />
                        <ThemedText
                          type="default"
                          className="flex-1 text-base"
                          style={{ color: textColor }}
                        >
                          {option.label}
                        </ThemedText>
                        {isSelected && (
                          <MaterialIcons
                            name="check"
                            size={22}
                            color={textColor}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View className="gap-2">
                  <ThemedText
                    type="default"
                    className="text-sm mb-1"
                    style={{ color: textColor }}
                  >
                    Порядок:
                  </ThemedText>
                  {sortOrderOptions.map((option) => {
                    const isSelected =
                      option.value === (sortParams.sortOrder || "desc");
                    return (
                      <TouchableOpacity
                        key={option.value}
                        onPress={() => {
                          onSortOrderChange(option.value);
                          onModalVisibleChange(false);
                        }}
                        className="flex-row items-center gap-3 p-3 rounded-lg"
                        style={{
                          backgroundColor: isSelected
                            ? selectedBgColor
                            : itemBgColor,
                        }}
                        activeOpacity={0.7}
                      >
                        <MaterialIcons
                          name={option.icon}
                          size={22}
                          color={textColor}
                        />
                        <ThemedText
                          type="default"
                          className="flex-1 text-base"
                          style={{ color: textColor }}
                        >
                          {option.label}
                        </ThemedText>
                        {isSelected && (
                          <MaterialIcons
                            name="check"
                            size={22}
                            color={textColor}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </ThemedView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
