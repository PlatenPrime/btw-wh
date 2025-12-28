import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  Box,
  Button,
  HStack,
  Input,
  InputField,
  Text,
  VStack,
} from "@/components/ui";
import type { PosResponse } from "@/modules/poses/api/types";
import { ActivityIndicator } from "react-native";

import { SemanticColors } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-colors";
import { Controller, useFormContext } from "react-hook-form";
import type { AskPosEditFormData } from "./schema";

interface AskPosEditFormViewProps {
  form: ReturnType<typeof useFormContext<AskPosEditFormData>>;
  pos: PosResponse;
  remainingQuant: number;
  remainingBoxes: number;
  onRemovedQuantChange: (value: string) => void;
  onRemovedBoxesChange: (value: string) => void;
  isSubmitting: boolean;
  onSubmit: (data: AskPosEditFormData) => void;
  onCancel?: () => void;
}

export function AskPosEditFormView({
  form,
  pos,
  remainingQuant,
  remainingBoxes,
  onRemovedQuantChange,
  onRemovedBoxesChange,
  isSubmitting,
  onSubmit,
  onCancel,
}: AskPosEditFormViewProps) {
  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const removedQuantValue = watch("removedQuant");
  const removedBoxesValue = watch("removedBoxes");
  const { card } = useThemeColors();

  const isDisabled =
    remainingQuant < 0 ||
    remainingBoxes < 0 ||
    removedQuantValue === "" ||
    isSubmitting;

  return (
    <VStack className="gap-4">
      {/* Информация о текущих остатках */}
      <ThemedView
        className="rounded-lg p-3 border"
        style={{
          backgroundColor: card.bg,
          borderColor: card.border,
        }}
      >
        <VStack className="gap-2">
          <ThemedText type="defaultSemiBold" className="text-sm">
            Поточні залишки:
          </ThemedText>
          <ThemedText type="default" className="text-sm">
            Товар: {pos.data!.quant} шт.
          </ThemedText>
          <ThemedText type="default" className="text-sm">
            Коробки: {pos.data!.boxes} шт.
          </ThemedText>
        </VStack>
      </ThemedView>

      {/* Поле для ввода убранного количества товара */}
      <Box className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Знято товару *
        </ThemedText>
        <Controller
          control={form.control}
          name="removedQuant"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className={`rounded-lg border bg-background-0 ${
                errors.removedQuant ? "border-error-500" : "border-outline-100"
              }`}
            >
              <InputField
                placeholder="Введіть кількість"
                placeholderTextColor={SemanticColors.placeholder.light}
                value={value === "0" ? "" : value || ""}
                onChangeText={(text) => {
                  onChange(text);
                  onRemovedQuantChange(text);
                }}
                onBlur={onBlur}
                keyboardType="numeric"
                editable={!isSubmitting}
                className="text-typography-900"
              />
            </Input>
          )}
        />
        {errors.removedQuant && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.removedQuant.message}
          </ThemedText>
        )}
      </Box>

      {/* Поле для ввода убранного количества коробок */}
      <Box className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Знято коробок
        </ThemedText>
        <Controller
          control={form.control}
          name="removedBoxes"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className={`rounded-lg border bg-background-0 ${
                errors.removedBoxes ? "border-error-500" : "border-outline-100"
              }`}
            >
              <InputField
                placeholder="Введіть кількість коробок"
                placeholderTextColor={SemanticColors.placeholder.light}
                value={value === "0" ? "" : value || ""}
                onChangeText={(text) => {
                  onChange(text);
                  onRemovedBoxesChange(text);
                }}
                onBlur={onBlur}
                keyboardType="numeric"
                editable={!isSubmitting}
                className="text-typography-900"
              />
            </Input>
          )}
        />
        {errors.removedBoxes && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.removedBoxes.message}
          </ThemedText>
        )}
      </Box>

      {/* Отображение остатков после операции */}
      <ThemedView
        className={`rounded-lg border p-3 ${
          remainingQuant < 0 || remainingBoxes < 0
            ? "border-error-500 bg-error-50/25"
            : "border-success-500 bg-success-50/25"
        }`}
      >
        <VStack className="gap-2">
          <ThemedText
            type="defaultSemiBold"
            className={`text-sm ${
              remainingQuant < 0 || remainingBoxes < 0
                ? "text-error-700"
                : "text-success-700"
            }`}
          >
            {remainingQuant < 0 || remainingBoxes < 0
              ? "Попередження: Недостатньо товару!"
              : "Залишиться після операції:"}
          </ThemedText>
          <ThemedText
            type="default"
            className={`text-sm ${
              remainingQuant < 0 ? "text-error-600" : "text-success-700"
            }`}
          >
            Товар: {remainingQuant} шт.
          </ThemedText>
          <ThemedText
            type="default"
            className={`text-sm ${
              remainingBoxes < 0 ? "text-error-600" : "text-success-700"
            }`}
          >
            Коробки: {remainingBoxes} шт.
          </ThemedText>
          {(remainingQuant < 0 || remainingBoxes < 0) && (
            <ThemedText type="default" className="text-xs text-error-600">
              Увага: Не можна зняти більше, ніж є в наявності!
            </ThemedText>
          )}
        </VStack>
      </ThemedView>

      {errors.root && (
        <ThemedView className="rounded-lg p-3 border border-error-500 bg-error-50">
          <ThemedText type="default" className="text-xs text-error-700">
            {errors.root.message}
          </ThemedText>
        </ThemedView>
      )}

      {/* Кнопки действий */}
      <HStack className="gap-2">
        {onCancel && (
          <Button
            onPress={onCancel}
            disabled={isSubmitting}
            variant="outline"
            className="flex-1"
          >
            <Text className="font-semibold">Скасувати</Text>
          </Button>
        )}
        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={isDisabled}
          className="flex-1"
        >
          {isSubmitting ? (
            <ActivityIndicator color={SemanticColors.white} />
          ) : (
            <Text className="text-white font-semibold">Підтвердити</Text>
          )}
        </Button>
      </HStack>
    </VStack>
  );
}
