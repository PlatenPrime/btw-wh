import { DialogActions } from "@/components/shared/dialog/dialog-actions/DialogActions";
import {
  ThemedBox,
  ThemedInput,
  ThemedInputField,
  ThemedSwitch,
} from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { SemanticColors } from "@/constants/theme";
import type { PalletFormValues } from "@/modules/pallets/components/forms/schema";
import { useTheme } from "@/providers/theme-provider";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

interface CreatePalletFormViewProps {
  form: UseFormReturn<PalletFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: PalletFormValues) => void;
  onCancel?: () => void;
  hideActions?: boolean;
}

export function CreatePalletFormView({
  form,
  isSubmitting,
  onSubmit,
  onCancel,
  hideActions = false,
}: CreatePalletFormViewProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const placeholder = SemanticColors.placeholder[theme];

  return (
    <ThemedBox className="gap-4">
      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Назва палети *
        </ThemedText>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedInput
              className={`rounded-lg border bg-background-0 ${
                errors.title ? "border-error-500" : "border-outline-50"
              }`}
            >
              <ThemedInputField
                placeholder="Введіть назву"
                placeholderTextColor={placeholder}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoFocus
                editable={!isSubmitting}
                className="text-typography-900"
              />
            </ThemedInput>
          )}
        />
        {errors.title && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.title.message}
          </ThemedText>
        )}
      </ThemedBox>

      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Сектор (опціонально)
        </ThemedText>
        <Controller
          control={control}
          name="sector"
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedInput
              className={`rounded-lg border bg-background-0 ${
                errors.sector ? "border-error-500" : "border-outline-50"
              }`}
            >
              <ThemedInputField
                placeholder="Введіть сектор"
                placeholderTextColor={placeholder}
                value={value || ""}
                onChangeText={onChange}
                onBlur={onBlur}
                editable={!isSubmitting}
                className="text-typography-900"
              />
            </ThemedInput>
          )}
        />
        {errors.sector && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.sector.message}
          </ThemedText>
        )}
      </ThemedBox>

      <ThemedBox className="flex-row items-center justify-between">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Аналіз
        </ThemedText>
        <Controller
          control={control}
          name="isDef"
          render={({ field: { onChange, value } }) => (
            <ThemedSwitch
              value={value}
              onValueChange={onChange}
              disabled={isSubmitting}
            />
          )}
        />
      </ThemedBox>

      {errors.root && (
        <ThemedView className="rounded-lg p-3 border border-error-500 bg-error-50">
          <ThemedText type="default" className="text-xs text-error-700">
            {errors.root.message}
          </ThemedText>
        </ThemedView>
      )}

      {!hideActions && (
        <DialogActions
          onCancel={onCancel}
          onSubmit={handleSubmit(onSubmit)}
          cancelText="Скасувати"
          submitText="Додати"
          isSubmitting={isSubmitting}
          variant="create"
        />
      )}
    </ThemedBox>
  );
}
