import {
  ThemedBox,
  ThemedButton,
  ThemedFlatList,
  ThemedHStack,
  ThemedIcon,
  ThemedInput,
  ThemedInputField,
  ThemedPressable,
  ThemedSpinner,
  ThemedText,
  ThemedVStack,
  ThemedView,
} from "@/components/themed";
import { useIconColor } from "@/hooks/use-icon-color";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { useEmptyPalletsQuery } from "@/modules/pallets/api/hooks/queries/useEmptyPalletsQuery";
import type { IPallet } from "@/modules/pallets/api/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";

interface MovePalletPosesFormProps {
  fromPallet: IPallet;
  onSuccess: (toPalletId: string) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
  hideActions?: boolean;
  onSubmitReady?: (submitFn: () => void, isDisabled: boolean) => void;
}

export function MovePalletPosesForm({
  fromPallet,
  onSuccess,
  onCancel,
  isSubmitting = false,
  hideActions = false,
  onSubmitReady,
}: MovePalletPosesFormProps) {
  const [search, setSearch] = useState("");
  const [selectedPalletId, setSelectedPalletId] = useState<string>("");
  const iconColor = useIconColor();
  const { placeholder, static: staticColors } = useThemeColors();

  const palletsQuery = useEmptyPalletsQuery();
  const pallets = palletsQuery.data;
  const isLoading = palletsQuery.isLoading;

  const filteredPallets = useMemo(() => {
    if (!pallets) return [] as IPallet[];
    const normalized = search.trim().toLowerCase();
    return pallets
      .filter((p) => p._id !== fromPallet._id)
      .filter((p) =>
        normalized ? p.title.toLowerCase().includes(normalized) : true
      )
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [pallets, fromPallet._id, search]);

  const handleSubmit = useCallback(() => {
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
  }, [selectedPalletId, pallets, onSuccess]);

  const isSubmitDisabled = !selectedPalletId || isSubmitting;

  useEffect(() => {
    if (onSubmitReady) {
      onSubmitReady(handleSubmit, isSubmitDisabled);
    }
  }, [onSubmitReady, handleSubmit, isSubmitDisabled]);

  return (
    <ThemedVStack className="gap-4">
      <ThemedVStack className="gap-2">
        <ThemedText type="default" className="text-sm">
          Цільова паллета
        </ThemedText>

        <ThemedInput className="rounded-lg border border-outline-100 bg-background-50">
          <ThemedInputField
            value={search}
            onChangeText={setSearch}
            placeholder="Пошук паллети за назвою"
            placeholderTextColor={placeholder}
            className="text-typography-900"
          />
        </ThemedInput>
      </ThemedVStack>

      <ThemedBox className="max-h-64 rounded-lg border border-outline-100 overflow-hidden">
        {isLoading ? (
          <ThemedBox className="p-4 items-center">
            <ThemedSpinner size="small" color={iconColor} />
          </ThemedBox>
        ) : filteredPallets.length === 0 ? (
          <ThemedBox className="p-4">
            <ThemedText type="default" className="text-sm text-center">
              Нічого не знайдено
            </ThemedText>
          </ThemedBox>
        ) : (
          <ThemedFlatList
            data={filteredPallets}
            keyExtractor={(item) => item._id}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={false}
            nestedScrollEnabled={true}
            renderItem={({ item }) => {
              const isEmpty = Array.isArray(item.poses)
                ? item.poses.length === 0
                : true;
              const disabled = !isEmpty;
              const isSelected = selectedPalletId === item._id;

              return (
                <ThemedPressable
                  onPress={() => !disabled && setSelectedPalletId(item._id)}
                  className={`flex-row items-center justify-between p-3 border-b border-outline-100 ${
                    isSelected ? "bg-background-200" : "bg-background-50"
                  }`}
                  disabled={disabled || isSubmitting}
                  style={{ opacity: disabled ? 0.5 : 1 }}
                >
                  <ThemedHStack className="items-center gap-3 flex-1">
                    <ThemedIcon
                      family="MaterialIcons"
                      name={
                        isSelected
                          ? "radio-button-checked"
                          : "radio-button-unchecked"
                      }
                      size={20}
                      color={disabled ? staticColors.disabled : iconColor}
                    />
                    <ThemedBox className="flex-1">
                      <ThemedText type="default" className="text-sm">
                        {item.title}
                      </ThemedText>
                      <ThemedText type="default" className="text-xs opacity-70">
                        Ряд: {item.rowData?.title}
                      </ThemedText>
                    </ThemedBox>
                  </ThemedHStack>
                  <ThemedBox>
                    {isEmpty ? (
                      <ThemedView className="px-2 py-1 rounded bg-success-500">
                        <ThemedText
                          type="default"
                          className="text-xs text-white"
                        >
                          Порожня
                        </ThemedText>
                      </ThemedView>
                    ) : (
                      <ThemedView className="px-2 py-1 rounded bg-error-500">
                        <ThemedText
                          type="default"
                          className="text-xs text-white"
                        >
                          Зайнята
                        </ThemedText>
                      </ThemedView>
                    )}
                  </ThemedBox>
                </ThemedPressable>
              );
            }}
          />
        )}
      </ThemedBox>

      {!hideActions && (
        <ThemedHStack className="gap-3">
          {onCancel && (
            <ThemedButton
              variant="outline"
              onPress={onCancel}
              className="flex-1"
              disabled={isSubmitting}
            >
              <ThemedText className="font-semibold">Скасувати</ThemedText>
            </ThemedButton>
          )}

          <ThemedButton
            onPress={handleSubmit}
            variant="confirm"
            className="flex-1"
            disabled={isSubmitDisabled}
          >
            {isSubmitting ? (
              <ActivityIndicator color={staticColors.white} />
            ) : (
              <ThemedText className="text-white font-semibold">Підтвердити</ThemedText>
            )}
          </ThemedButton>
        </ThemedHStack>
      )}
    </ThemedVStack>
  );
}
