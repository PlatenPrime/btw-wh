import { useState, useMemo } from "react";
import { View, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { IPallet } from "@/modules/pallets/api/types";
import { useEmptyPalletsQuery } from "@/modules/pallets/api/hooks/queries/useEmptyPalletsQuery";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

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
  const colorScheme = useColorScheme() ?? "light";
  const textColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";
  const bgColor = colorScheme === "light" ? "#f9fafb" : "#374151";
  const selectedBgColor = colorScheme === "light" ? "#e5e7eb" : "#4b5563";

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
    <View className="gap-4">
      <View className="gap-2">
        <ThemedText type="default" className="text-sm">
          Цільова паллета
        </ThemedText>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Пошук паллети за назвою"
          placeholderTextColor={colorScheme === "light" ? "#9ca3af" : "#6b7280"}
          className="p-3 rounded-lg border"
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
            color: textColor,
          }}
        />
      </View>

      <View className="max-h-64 rounded-lg border overflow-hidden" style={{ borderColor }}>
        {isLoading ? (
          <View className="p-4 items-center">
            <ActivityIndicator size="small" color={textColor} />
          </View>
        ) : filteredPallets.length === 0 ? (
          <View className="p-4">
            <ThemedText type="default" className="text-sm text-center">
              Нічого не знайдено
            </ThemedText>
          </View>
        ) : (
          <FlatList
            data={filteredPallets}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              const isEmpty = Array.isArray(item.poses)
                ? item.poses.length === 0
                : true;
              const disabled = !isEmpty;
              const isSelected = selectedPalletId === item._id;

              return (
                <TouchableOpacity
                  onPress={() => !disabled && setSelectedPalletId(item._id)}
                  className="flex-row items-center justify-between p-3 border-b"
                  style={{
                    backgroundColor: isSelected ? selectedBgColor : bgColor,
                    borderBottomColor: borderColor,
                    opacity: disabled ? 0.5 : 1,
                  }}
                  disabled={disabled || isSubmitting}
                  activeOpacity={0.7}
                >
                  <View className="flex-row items-center gap-3 flex-1">
                    <MaterialIcons
                      name={isSelected ? "radio-button-checked" : "radio-button-unchecked"}
                      size={20}
                      color={disabled ? "#9ca3af" : textColor}
                    />
                    <View className="flex-1">
                      <ThemedText type="default" className="text-sm">
                        {item.title}
                      </ThemedText>
                      <ThemedText type="default" className="text-xs opacity-70">
                        Ряд: {item.rowData?.title}
                      </ThemedText>
                    </View>
                  </View>
                  <View>
                    {isEmpty ? (
                      <ThemedView className="px-2 py-1 rounded" style={{ backgroundColor: "#22c55e" }}>
                        <ThemedText type="default" className="text-xs" style={{ color: "#fff" }}>
                          Порожня
                        </ThemedText>
                      </ThemedView>
                    ) : (
                      <ThemedView className="px-2 py-1 rounded" style={{ backgroundColor: "#ef4444" }}>
                        <ThemedText type="default" className="text-xs" style={{ color: "#fff" }}>
                          Зайнята
                        </ThemedText>
                      </ThemedView>
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>

      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={onCancel}
          className="flex-1 items-center justify-center py-3 rounded-lg border"
          style={{
            borderColor: borderColor,
          }}
          activeOpacity={0.7}
          disabled={isSubmitting}
        >
          <ThemedText type="defaultSemiBold">Скасувати</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSubmit}
          className="flex-1 items-center justify-center py-3 rounded-lg"
          style={{
            backgroundColor: selectedPalletId ? "#8b5cf6" : "#9ca3af",
          }}
          activeOpacity={0.7}
          disabled={!selectedPalletId || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
              Підтвердити
            </ThemedText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

