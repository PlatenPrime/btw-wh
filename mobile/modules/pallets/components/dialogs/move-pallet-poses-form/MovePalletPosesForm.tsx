import { useState, useMemo } from "react";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Box, VStack, HStack, Input, InputField, FlatList, Pressable, Button, ButtonText, ButtonSpinner, Spinner, Icon } from "@/components/ui";
import type { IPallet } from "@/modules/pallets/api/types";
import { useEmptyPalletsQuery } from "@/modules/pallets/api/hooks/queries/useEmptyPalletsQuery";
import { useIconColor } from "@/hooks/use-icon-color";
import { SemanticColors } from "@/constants/theme";

interface MovePalletPosesFormProps {
  fromPallet: IPallet;
  onSuccess: (toPalletId: string) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function MovePalletPosesForm({
  fromPallet,
  onSuccess,
  onCancel,
  isSubmitting = false,
}: MovePalletPosesFormProps) {
  const [search, setSearch] = useState("");
  const [selectedPalletId, setSelectedPalletId] = useState<string>("");
  const iconColor = useIconColor();

  const palletsQuery = useEmptyPalletsQuery();
  const pallets = palletsQuery.data;
  const isLoading = palletsQuery.isLoading;

  const filteredPallets = useMemo(() => {
    if (!pallets) return [] as IPallet[];
    const normalized = search.trim().toLowerCase();
    return pallets
      .filter((p) => p._id !== fromPallet._id)
      .filter((p) =>
        normalized ? p.title.toLowerCase().includes(normalized) : true,
      )
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [pallets, fromPallet._id, search]);

  const handleSubmit = () => {
    if (!selectedPalletId) {
      return;
    }
    const selected = pallets?.find((p) => p._id === selectedPalletId);
    if (!selected) {
      return;
    }
    const isEmpty = Array.isArray(selected.poses)
      ? selected.poses.length === 0
      : true;
    if (!isEmpty) {
      return;
    }
    onSuccess(selected._id);
  };

  return (
    <VStack className="gap-4">
      <VStack className="gap-2">
        <ThemedText type="default" className="text-sm">
          Цільова паллета
        </ThemedText>

        <Input className="rounded-lg border border-outline-200 bg-background-50">
          <InputField
            value={search}
            onChangeText={setSearch}
            placeholder="Пошук паллети за назвою"
            placeholderTextColor={SemanticColors.placeholder.light}
            className="text-typography-900"
          />
        </Input>
      </VStack>

      <Box className="max-h-64 rounded-lg border border-outline-200 overflow-hidden">
        {isLoading ? (
          <Box className="p-4 items-center">
            <Spinner size="small" color={iconColor} />
          </Box>
        ) : filteredPallets.length === 0 ? (
          <Box className="p-4">
            <ThemedText type="default" className="text-sm text-center">
              Нічого не знайдено
            </ThemedText>
          </Box>
        ) : (
          <FlatList
            data={filteredPallets}
            keyExtractor={(item) => item._id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => {
              const isEmpty = Array.isArray(item.poses)
                ? item.poses.length === 0
                : true;
              const disabled = !isEmpty;
              const isSelected = selectedPalletId === item._id;

              return (
                <Pressable
                  onPress={() => !disabled && setSelectedPalletId(item._id)}
                  className={`flex-row items-center justify-between p-3 border-b border-outline-200 ${
                    isSelected ? "bg-background-200" : "bg-background-50"
                  }`}
                  disabled={disabled || isSubmitting}
                  opacity={disabled ? 0.5 : 1}
                >
                  <HStack className="items-center gap-3 flex-1">
                    <Icon
                      family="MaterialIcons"
                      name={isSelected ? "radio-button-checked" : "radio-button-unchecked"}
                      size={20}
                      color={disabled ? SemanticColors.disabled : iconColor}
                    />
                    <Box className="flex-1">
                      <ThemedText type="default" className="text-sm">
                        {item.title}
                      </ThemedText>
                      <ThemedText type="default" className="text-xs opacity-70">
                        Ряд: {item.rowData?.title}
                      </ThemedText>
                    </Box>
                  </HStack>
                  <Box>
                    {isEmpty ? (
                      <ThemedView className="px-2 py-1 rounded bg-success-500">
                        <ThemedText type="default" className="text-xs text-white">
                          Порожня
                        </ThemedText>
                      </ThemedView>
                    ) : (
                      <ThemedView className="px-2 py-1 rounded bg-error-500">
                        <ThemedText type="default" className="text-xs text-white">
                          Зайнята
                        </ThemedText>
                      </ThemedView>
                    )}
                  </Box>
                </Pressable>
              );
            }}
          />
        )}
      </Box>

      <HStack className="gap-3">
        <Button
          variant="outline"
          onPress={onCancel}
          className="flex-1 rounded-lg border border-outline-200 bg-background-0 items-center justify-center py-3"
          isDisabled={isSubmitting}
        >
          <ButtonText>
            <ThemedText type="defaultSemiBold">Скасувати</ThemedText>
          </ButtonText>
        </Button>

        <Button
          onPress={handleSubmit}
          className="flex-1 rounded-lg items-center justify-center py-3"
          style={{
            backgroundColor: !selectedPalletId || isSubmitting ? SemanticColors.disabled : SemanticColors.primary,
            opacity: !selectedPalletId || isSubmitting ? 0.5 : 1
          }}
          isDisabled={!selectedPalletId || isSubmitting}
        >
          {isSubmitting ? (
            <ButtonSpinner color={SemanticColors.white} />
          ) : (
            <ButtonText>
              <ThemedText type="defaultSemiBold" className="text-white">
                Підтвердити
              </ThemedText>
            </ButtonText>
          )}
        </Button>
      </HStack>
    </VStack>
  );
}

