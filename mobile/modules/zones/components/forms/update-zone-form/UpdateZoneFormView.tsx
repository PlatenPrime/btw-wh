import {
  ThemedBox,
  ThemedButton,
  ThemedHStack,
  ThemedInput,
  ThemedInputField,
  ThemedText,
  ThemedView,
} from "@/components/themed";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { UpdateZoneFormValues } from "@/modules/zones/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { ActivityIndicator } from "react-native";

interface UpdateZoneFormViewProps {
  form: UseFormReturn<UpdateZoneFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: UpdateZoneFormValues) => void;
  onCancel: () => void;
}

export function UpdateZoneFormView({
  form,
  isSubmitting,
  onSubmit,
  onCancel,
}: UpdateZoneFormViewProps) {
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
          Назва зони
        </ThemedText>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedInput
              className={`rounded-lg border bg-background-0 ${
                errors.title ? "border-error-500" : "border-outline-100"
              }`}
            >
              <ThemedInputField
                placeholder="42-5-2"
                placeholderTextColor={placeholder}
                value={value || ""}
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
          Штрих-код
        </ThemedText>
        <Controller
          control={control}
          name="bar"
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedInput
              className={`rounded-lg border bg-background-0 ${
                errors.bar ? "border-error-500" : "border-outline-100"
              }`}
            >
              <ThemedInputField
                placeholder="420502"
                placeholderTextColor={placeholder}
                value={value ? String(value) : ""}
                onChangeText={(text) => {
                  const num = text === "" ? undefined : Number(text);
                  onChange(isNaN(num as number) ? undefined : num);
                }}
                onBlur={onBlur}
                keyboardType="numeric"
                editable={!isSubmitting}
                className="text-typography-900"
              />
            </ThemedInput>
          )}
        />
        {errors.bar && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.bar.message}
          </ThemedText>
        )}
      </ThemedBox>

      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Сектор
        </ThemedText>
        <Controller
          control={control}
          name="sector"
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedInput
              className={`rounded-lg border bg-background-0 ${
                errors.sector ? "border-error-500" : "border-outline-100"
              }`}
            >
              <ThemedInputField
                placeholder="0"
                placeholderTextColor={placeholder}
                value={value ? String(value) : ""}
                onChangeText={(text) => {
                  const num = text === "" ? undefined : Number(text);
                  onChange(isNaN(num as number) ? undefined : num);
                }}
                onBlur={onBlur}
                keyboardType="numeric"
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
          <ThemedText className="font-semibold">Скасувати</ThemedText>
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
            <ThemedText className="text-white font-semibold">Оновити</ThemedText>
          )}
        </ThemedButton>
      </ThemedHStack>
    </ThemedBox>
  );
}
