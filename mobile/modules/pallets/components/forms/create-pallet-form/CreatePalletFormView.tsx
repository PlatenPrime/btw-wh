import { DialogActions } from "@/components/shared/dialog/dialog-actions/DialogActions";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { Box, Input, InputField, Switch } from "@/components/ui";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { PalletFormValues } from "@/modules/pallets/components/forms/schema";
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
  const { placeholder } = useThemeColors();

  return (
    <Box className="gap-4">
      <Box className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Назва палети *
        </ThemedText>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className={`rounded-lg border bg-background-0 ${
                errors.title ? "border-error-500" : "border-outline-100"
              }`}
            >
              <InputField
                placeholder="Введіть назву"
                placeholderTextColor={placeholder}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoFocus
                editable={!isSubmitting}
                className="text-typography-900"
              />
            </Input>
          )}
        />
        {errors.title && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.title.message}
          </ThemedText>
        )}
      </Box>

      <Box className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Сектор (опціонально)
        </ThemedText>
        <Controller
          control={control}
          name="sector"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className={`rounded-lg border bg-background-0 ${
                errors.sector ? "border-error-500" : "border-outline-100"
              }`}
            >
              <InputField
                placeholder="Введіть сектор"
                placeholderTextColor={placeholder}
                value={value || ""}
                onChangeText={onChange}
                onBlur={onBlur}
                editable={!isSubmitting}
                className="text-typography-900"
              />
            </Input>
          )}
        />
        {errors.sector && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.sector.message}
          </ThemedText>
        )}
      </Box>

      <Box className="flex-row items-center justify-between">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Аналіз
        </ThemedText>
        <Controller
          control={control}
          name="isDef"
          render={({ field: { onChange, value } }) => (
            <Switch
              value={value}
              onValueChange={onChange}
              disabled={isSubmitting}
            />
          )}
        />
      </Box>

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
    </Box>
  );
}
