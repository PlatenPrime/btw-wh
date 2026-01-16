import {
  ThemedBox,
  ThemedButton,
  ThemedHStack,
  ThemedInput,
  ThemedInputField,
  ThemedText,
  ThemedVStack,
  ThemedView,
} from "@/components/themed";
import { SemanticColors } from "@/constants/theme";
import type { PosResponse } from "@/modules/poses/api/types";
import { useTheme } from "@/providers/theme-provider";
import { Controller, type UseFormReturn } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import type { AskPosEditFormData } from "./schema";

interface AskPosEditFormViewProps {
  form: UseFormReturn<AskPosEditFormData>;
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
    watch,
    formState: { errors, isValid },
  } = form;

  const removedQuantValue = watch("removedQuant");
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const placeholder = SemanticColors.placeholder[theme];

  // #region agent log
  const logData = {
    removedQuantValue,
    remainingQuant,
    remainingBoxes,
    isSubmitting,
    errors: Object.keys(errors),
  };
  fetch("http://127.0.0.1:7242/ingest/95c9df87-1dd6-4841-9332-e064e1013b10", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      location: "AskPosEditFormView.tsx:48",
      message: "Form state check",
      data: logData,
      timestamp: Date.now(),
      sessionId: "debug-session",
      runId: "run1",
      hypothesisId: "C",
    }),
  }).catch(() => {});
  // #endregion

  return (
    <ThemedVStack className="gap-4">
      {/* Информация о текущих остатках */}
      <ThemedView className="rounded-lg p-3 border bg-background-0 border-outline-100">
        <ThemedVStack className="gap-2">
          <ThemedText type="defaultSemiBold" className="text-sm">
            Поточні залишки:
          </ThemedText>
          <ThemedText type="default" className="text-sm">
            Товар: {pos.data!.quant} шт.
          </ThemedText>
          <ThemedText type="default" className="text-sm">
            Коробки: {pos.data!.boxes} шт.
          </ThemedText>
        </ThemedVStack>
      </ThemedView>

      {/* Поле для ввода убранного количества товара */}
      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Знято товару *
        </ThemedText>
        <Controller
          control={form.control}
          name="removedQuant"
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedInput
              className={`rounded-lg border bg-background-0 ${
                errors.removedQuant ? "border-error-500" : "border-outline-50"
              }`}
            >
              <ThemedInputField
                placeholder="Введіть кількість"
                placeholderTextColor={placeholder}
                value={value === "0" ? "" : value || ""}
                onChangeText={(text) => {
                  // Форматируем значение
                  const cleanValue = text.replace(/[^0-9-]/g, "");
                  const hasMinus = cleanValue.includes("-");
                  const numericPart = cleanValue.replace(/-/g, "");

                  let processedValue: string;
                  if (hasMinus && !cleanValue.startsWith("-")) {
                    processedValue = numericPart;
                  } else if (cleanValue === "" || cleanValue === "-") {
                    processedValue = "";
                  } else if (numericPart === "0") {
                    processedValue = hasMinus ? "-0" : "0";
                  } else {
                    processedValue = hasMinus
                      ? `-${numericPart.replace(/^0+/, "") || "0"}`
                      : numericPart.replace(/^0+/, "") || "0";
                  }

                  // Вызываем onChange для немедленного обновления watch
                  onChange(processedValue);
                  // Также вызываем утилиту для синхронизации через setValue
                  onRemovedQuantChange(text);
                }}
                onBlur={onBlur}
                keyboardType="numeric"
                editable={!isSubmitting}
                className="text-typography-900"
              />
            </ThemedInput>
          )}
        />
        {errors.removedQuant && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.removedQuant.message}
          </ThemedText>
        )}
      </ThemedBox>

      {/* Поле для ввода убранного количества коробок */}
      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Знято коробок
        </ThemedText>
        <Controller
          control={form.control}
          name="removedBoxes"
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedInput
              className={`rounded-lg border bg-background-0 ${
                errors.removedBoxes ? "border-error-500" : "border-outline-50"
              }`}
            >
              <ThemedInputField
                placeholder="Введіть кількість коробок"
                placeholderTextColor={placeholder}
                value={value === "0" ? "" : value || ""}
                onChangeText={(text: string) => {
                  // Форматируем значение
                  const cleanValue = text.replace(/[^0-9-]/g, "");
                  const hasMinus = cleanValue.includes("-");
                  const numericPart = cleanValue.replace(/-/g, "");

                  let processedValue: string;
                  if (hasMinus && !cleanValue.startsWith("-")) {
                    processedValue = numericPart;
                  } else if (cleanValue === "" || cleanValue === "-") {
                    processedValue = "";
                  } else if (numericPart === "0") {
                    processedValue = hasMinus ? "-0" : "0";
                  } else {
                    processedValue = hasMinus
                      ? `-${numericPart.replace(/^0+/, "") || "0"}`
                      : numericPart.replace(/^0+/, "") || "0";
                  }

                  // Вызываем onChange для немедленного обновления watch
                  onChange(processedValue);
                  // Также вызываем утилиту для синхронизации через setValue
                  onRemovedBoxesChange(text);
                }}
                onBlur={onBlur}
                keyboardType="numeric"
                editable={!isSubmitting}
                className="text-typography-900"
              />
            </ThemedInput>
          )}
        />
        {errors.removedBoxes && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.removedBoxes.message}
          </ThemedText>
        )}
      </ThemedBox>

      {/* Отображение остатков после операции */}
      <ThemedView
        className={`rounded-lg border p-3 ${
          remainingQuant < 0 || remainingBoxes < 0
            ? "border-error-500 bg-error-50/25"
            : "border-success-500 bg-success-50/25"
        }`}
      >
        <ThemedVStack className="gap-2">
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
        </ThemedVStack>
      </ThemedView>

      {errors.root && (
        <ThemedView className="rounded-lg p-3 border border-error-500 bg-error-50">
          <ThemedText type="default" className="text-xs text-error-700">
            {errors.root.message}
          </ThemedText>
        </ThemedView>
      )}

      {/* Кнопки действий */}
      <ThemedHStack className="gap-2">
        {onCancel && (
          <ThemedButton
            onPress={onCancel}
            disabled={isSubmitting}
            variant="outline"
            className="flex-1"
          >
            <ThemedText className="font-semibold">Скасувати</ThemedText>
          </ThemedButton>
        )}
        <ThemedButton
          onPress={(e) => {
            console.log("Button pressed, isValid:", isValid, "errors:", errors);
            handleSubmit(onSubmit)(e);
          }}
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (
            <ActivityIndicator color={SemanticColors.white} />
          ) : (
            <ThemedText className="text-white font-semibold">
              Підтвердити
            </ThemedText>
          )}
        </ThemedButton>
      </ThemedHStack>
    </ThemedVStack>
  );
}
