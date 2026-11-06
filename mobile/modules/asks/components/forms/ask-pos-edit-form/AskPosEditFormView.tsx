import {
  ThemedBox,
  ThemedButton,
  ThemedHStack,
  ThemedText,
  ThemedVStack,
  ThemedView,
} from "@/components/themed";
import { NumericDraftField } from "@/components/shared/numeric-draft-field";
import { SemanticColors } from "@/constants/theme";
import type { PosResponse } from "@/modules/poses/api/types";
import { useTheme } from "@/providers/theme-provider";
import {
  filterQuantInput,
  normalizeQuantInput,
} from "@/utils/quant-input";
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
    formState: { errors },
  } = form;

  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const placeholder = SemanticColors.placeholder[theme];

  return (
    <ThemedVStack className="gap-4">
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

      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Знято товару *
        </ThemedText>
        <Controller
          control={form.control}
          name="removedQuant"
          render={({ field: { onChange, onBlur, value } }) => (
            <NumericDraftField
              value={value === "0" ? "" : value || ""}
              onChange={(next) => {
                onChange(next);
                onRemovedQuantChange(next);
              }}
              onBlur={onBlur}
              filter={filterQuantInput}
              normalize={normalizeQuantInput}
              placeholder="Введіть кількість"
              placeholderTextColor={placeholder}
              editable={!isSubmitting}
              error={!!errors.removedQuant}
            />
          )}
        />
        {errors.removedQuant && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.removedQuant.message}
          </ThemedText>
        )}
      </ThemedBox>

      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Знято коробок
        </ThemedText>
        <Controller
          control={form.control}
          name="removedBoxes"
          render={({ field: { onChange, onBlur, value } }) => (
            <NumericDraftField
              value={value === "0" ? "" : value || ""}
              onChange={(next) => {
                onChange(next);
                onRemovedBoxesChange(next);
              }}
              onBlur={onBlur}
              filter={filterQuantInput}
              normalize={normalizeQuantInput}
              placeholder="Введіть кількість коробок"
              placeholderTextColor={placeholder}
              editable={!isSubmitting}
              error={!!errors.removedBoxes}
            />
          )}
        />
        {errors.removedBoxes && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.removedBoxes.message}
          </ThemedText>
        )}
      </ThemedBox>

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
          onPress={handleSubmit(onSubmit)}
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
