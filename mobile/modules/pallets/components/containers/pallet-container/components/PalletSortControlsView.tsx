import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { GetPosesByPalletIdParams } from "@/modules/poses/api/services/queries/getPosesByPalletId";
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, Pressable, Box, HStack, VStack } from "@/components/ui";
import { Icon } from "@/components/ui/icon";

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
  return (
    <>
      <Pressable
        onPress={() => onModalVisibleChange(true)}
        className="flex-row items-center gap-2 px-3 py-2 rounded-lg border border-outline-200 bg-background-0"
      >
        <Icon
          family="MaterialIcons"
          name={currentSortBy?.icon || "sort"}
          size={18}
          className="text-typography-900"
        />
        <ThemedText type="default" className="text-sm">
          {currentSortBy?.label}
        </ThemedText>
        <Icon
          family="MaterialIcons"
          name={currentSortOrder?.icon || "arrow-downward"}
          size={18}
          className="text-typography-900"
        />
      </Pressable>

      <Modal isOpen={modalVisible} onClose={() => onModalVisibleChange(false)}>
        <ModalBackdrop />
        <ModalContent className="w-full max-w-md mx-4 rounded-xl border border-outline-200 bg-background-0 p-6">
          <ModalHeader>
            <HStack className="items-center justify-between">
              <ThemedText type="defaultSemiBold" className="text-lg">
                Сортування
              </ThemedText>
              <ModalCloseButton onPress={() => onModalVisibleChange(false)}>
                <Icon
                  family="MaterialIcons"
                  name="close"
                  size={24}
                  className="text-typography-900"
                />
              </ModalCloseButton>
            </HStack>
          </ModalHeader>
          <VStack className="gap-4">
            <VStack className="gap-2">
              <ThemedText type="default" className="text-sm mb-1 text-typography-900">
                Сортувати по:
              </ThemedText>
              {sortByOptions.map((option) => {
                const isSelected =
                  option.value === (sortParams.sortBy || "updatedAt");
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => {
                      onSortByChange(option.value);
                      onModalVisibleChange(false);
                    }}
                    className={`flex-row items-center gap-3 p-3 rounded-lg ${
                      isSelected ? "bg-background-200" : "bg-background-50"
                    }`}
                  >
                    <Icon
                      family="MaterialIcons"
                      name={option.icon}
                      size={22}
                      className="text-typography-900"
                    />
                    <ThemedText
                      type="default"
                      className="flex-1 text-base text-typography-900"
                    >
                      {option.label}
                    </ThemedText>
                    {isSelected && (
                      <Icon
                        family="MaterialIcons"
                        name="check"
                        size={22}
                        className="text-typography-900"
                      />
                    )}
                  </Pressable>
                );
              })}
            </VStack>

            <VStack className="gap-2">
              <ThemedText type="default" className="text-sm mb-1 text-typography-900">
                Порядок:
              </ThemedText>
              {sortOrderOptions.map((option) => {
                const isSelected =
                  option.value === (sortParams.sortOrder || "desc");
                return (
                  <Pressable
                    key={option.value}
                    onPress={() => {
                      onSortOrderChange(option.value);
                      onModalVisibleChange(false);
                    }}
                    className={`flex-row items-center gap-3 p-3 rounded-lg ${
                      isSelected ? "bg-background-200" : "bg-background-50"
                    }`}
                  >
                    <Icon
                      family="MaterialIcons"
                      name={option.icon}
                      size={22}
                      className="text-typography-900"
                    />
                    <ThemedText
                      type="default"
                      className="flex-1 text-base text-typography-900"
                    >
                      {option.label}
                    </ThemedText>
                    {isSelected && (
                      <Icon
                        family="MaterialIcons"
                        name="check"
                        size={22}
                        className="text-typography-900"
                      />
                    )}
                  </Pressable>
                );
              })}
            </VStack>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
}
