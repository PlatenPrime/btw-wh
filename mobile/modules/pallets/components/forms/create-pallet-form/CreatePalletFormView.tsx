import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  Box,
  Input,
  InputField,
  Switch,
  HStack,
} from "@/components/ui";
import type { PalletFormValues } from "@/modules/pallets/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { SemanticColors } from "@/constants/theme";

interface CreatePalletFormViewProps {
  form: UseFormReturn<PalletFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: PalletFormValues) => void;
  onCancel?: () => void;
}

export function CreatePalletFormView({
  form,
  isSubmitting,
  onSubmit,
  onCancel,
}: CreatePalletFormViewProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

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
                errors.title ? "border-error-500" : "border-outline-200"
              }`}
            >
              <InputField
                placeholder="Введіть назву"
                placeholderTextColor={SemanticColors.placeholder.light}
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
                errors.sector ? "border-error-500" : "border-outline-200"
              }`}
            >
              <InputField
                placeholder="Введіть сектор"
                placeholderTextColor={SemanticColors.placeholder.light}
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

      <DialogActions
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
        cancelText="Скасувати"
        submitText="Додати"
        isSubmitting={isSubmitting}
      />
    </Box>
  );
}

