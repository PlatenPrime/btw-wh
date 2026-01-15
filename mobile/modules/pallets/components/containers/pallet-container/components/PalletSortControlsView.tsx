import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import type { GetPosesByPalletIdParams } from "@/modules/poses/api/services/queries/getPosesByPalletId";
import {
  ThemedModal,
  ThemedModalBackdrop,
  ThemedModalContent,
  ThemedModalHeader,
  ThemedModalCloseButton,
  ThemedPressable,
  ThemedBox,
  ThemedHStack,
  ThemedVStack,
  ThemedIcon,
} from "@/components/themed";
import { useIconColor } from "@/hooks/use-icon-color";

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
        icon: string;
      }
    | undefined;
  currentSortOrder:
    | {
        value: "asc" | "desc";
        label: string;
        icon: string;
      }
    | undefined;
  sortByOptions: {
    value: "artikul" | "updatedAt";
    label: string;
    icon: string;
  }[];
  sortOrderOptions: {
    value: "asc" | "desc";
    label: string;
    icon: string;
  }[];
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
}: PalletSortControlsViewProps) {
  const iconColor = useIconColor();
  
  return (
    <>
      <ThemedPressable
        onPress={() => onModalVisibleChange(true)}
        className="flex-row items-center gap-2 px-3 py-2 p-2 rounded-lg border border-outline-50 bg-background-0"
      >
        <ThemedIcon
          family="MaterialIcons"
          name={currentSortBy?.icon || "sort"}
          size={18}
          color={iconColor}
        />
        <ThemedText type="default" className="text-sm">
          {currentSortBy?.label}
        </ThemedText>
        <ThemedIcon
          family="MaterialIcons"
          name={currentSortOrder?.icon || "arrow-downward"}
          size={18}
          color={iconColor}
        />
      </ThemedPressable>

      <ThemedModal isOpen={modalVisible} onClose={() => onModalVisibleChange(false)}>
        <ThemedModalBackdrop />
        <ThemedModalContent className="w-full max-w-md mx-4 rounded-xl border border-outline-50 bg-background-0 p-6">
          <ThemedModalHeader>
            <ThemedHStack className="items-center justify-between">
              <ThemedText type="defaultSemiBold" className="text-lg">
                Сортування
              </ThemedText>
              <ThemedModalCloseButton onPress={() => onModalVisibleChange(false)}>
                <ThemedIcon
                  family="MaterialIcons"
                  name="close"
                  size={24}
                  color={iconColor}
                />
              </ThemedModalCloseButton>
            </ThemedHStack>
          </ThemedModalHeader>
          <ThemedVStack className="gap-4">
            <ThemedVStack className="gap-2">
              <ThemedText type="default" className="text-sm mb-1 text-typography-900">
                Сортувати по:
              </ThemedText>
              {sortByOptions.map((option) => {
                const isSelected =
                  option.value === (sortParams.sortBy || "updatedAt");
                return (
                  <ThemedPressable
                    key={option.value}
                    onPress={() => {
                      onSortByChange(option.value);
                      onModalVisibleChange(false);
                    }}
                    className={`flex-row items-center gap-3 p-3 rounded-lg ${
                      isSelected ? "bg-background-200" : "bg-background-50"
                    }`}
                  >
                    <ThemedIcon
                      family="MaterialIcons"
                      name={option.icon}
                      size={22}
                      color={iconColor}
                    />
                    <ThemedText
                      type="default"
                      className="flex-1 text-base"
                    >
                      {option.label}
                    </ThemedText>
                    {isSelected && (
                      <ThemedIcon
                        family="MaterialIcons"
                        name="check"
                        size={22}
                        color={iconColor}
                      />
                    )}
                  </ThemedPressable>
                );
              })}
            </ThemedVStack>

            <ThemedVStack className="gap-2">
              <ThemedText type="default" className="text-sm mb-1 text-typography-900">
                Порядок:
              </ThemedText>
              {sortOrderOptions.map((option) => {
                const isSelected =
                  option.value === (sortParams.sortOrder || "desc");
                return (
                  <ThemedPressable
                    key={option.value}
                    onPress={() => {
                      onSortOrderChange(option.value);
                      onModalVisibleChange(false);
                    }}
                    className={`flex-row items-center gap-3 p-3 rounded-lg ${
                      isSelected ? "bg-background-200" : "bg-background-50"
                    }`}
                  >
                    <ThemedIcon
                      family="MaterialIcons"
                      name={option.icon}
                      size={22}
                      color={iconColor}
                    />
                    <ThemedText
                      type="default"
                      className="flex-1 text-base"
                    >
                      {option.label}
                    </ThemedText>
                    {isSelected && (
                      <ThemedIcon
                        family="MaterialIcons"
                        name="check"
                        size={22}
                        color={iconColor}
                      />
                    )}
                  </ThemedPressable>
                );
              })}
            </ThemedVStack>
          </ThemedVStack>
        </ThemedModalContent>
      </ThemedModal>
    </>
  );
}
