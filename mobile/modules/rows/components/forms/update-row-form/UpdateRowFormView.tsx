import { ThemedInput, ThemedInputField } from "@/components/themed";
import { ThemedBox, ThemedButton, ThemedHStack, ThemedText as ThemedTextButton } from "@/components/themed";
import { ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import type { RowFormValues } from "@/modules/rows/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useThemeColors } from "@/hooks/use-theme-colors";

interface UpdateRowFormViewProps {
  form: UseFormReturn<RowFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: RowFormValues) => void;
  onCancel: () => void;
}

export function UpdateRowFormView({
  form,
  isSubmitting,
  onSubmit,
  onCancel,
}: UpdateRowFormViewProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const { placeholder, static: staticColors } = useThemeColors();

  return (
    <ThemedBox className="gap-4">
      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Назва ряду *
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
                placeholder="XX-XX"
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

      {errors.root && (
        <ThemedView className="rounded-lg p-3 border border-error-500 bg-error-50">
          <ThemedText type="default" className="text-xs text-error-700">
            {errors.root.message}
          </ThemedText>
        </ThemedView>
      )}

      <ThemedHStack className="gap-2">
        <ThemedButton
          onPress={onCancel}
          disabled={isSubmitting}
          variant="outline"
          className="flex-1"
        >
          <ThemedTextButton className="font-semibold">Скасувати</ThemedTextButton>
        </ThemedButton>
        <ThemedButton
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          variant="confirm"
          className="flex-1"
        >
          {isSubmitting ? (
            <ActivityIndicator color={staticColors.white} />
          ) : (
            <ThemedTextButton className="text-white font-semibold">Оновити</ThemedTextButton>
          )}
        </ThemedButton>
      </ThemedHStack>
    </ThemedBox>
  );
}

