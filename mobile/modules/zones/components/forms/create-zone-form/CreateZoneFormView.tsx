import {
  ThemedBox,
  ThemedButton,
  ThemedText,
  ThemedView,
} from "@/components/themed";
import { HStack, Input, InputField, Text } from "@/components/ui";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { CreateZoneFormValues } from "@/modules/zones/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { ActivityIndicator } from "react-native";

interface CreateZoneFormViewProps {
  form: UseFormReturn<CreateZoneFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: CreateZoneFormValues) => void;
  onCancel?: () => void;
}

export function CreateZoneFormView({
  form,
  isSubmitting,
  onSubmit,
  onCancel,
}: CreateZoneFormViewProps) {
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
          Назва зони *
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
                placeholder="42-5-2"
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
      </ThemedBox>

      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Штрих-код *
        </ThemedText>
        <Controller
          control={control}
          name="bar"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className={`rounded-lg border bg-background-0 ${
                errors.bar ? "border-error-500" : "border-outline-100"
              }`}
            >
              <InputField
                placeholder="420502"
                placeholderTextColor={placeholder}
                value={value ? String(value) : ""}
                onChangeText={(text) => {
                  const num = text === "" ? 0 : Number(text);
                  onChange(isNaN(num) ? 0 : num);
                }}
                onBlur={onBlur}
                keyboardType="numeric"
                editable={!isSubmitting}
                className="text-typography-900"
              />
            </Input>
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
            <Input
              className={`rounded-lg border bg-background-0 ${
                errors.sector ? "border-error-500" : "border-outline-100"
              }`}
            >
              <InputField
                placeholder="0"
                placeholderTextColor={placeholder}
                value={value ? String(value) : ""}
                onChangeText={(text) => {
                  const num = text === "" ? 0 : Number(text);
                  onChange(isNaN(num) ? 0 : num);
                }}
                onBlur={onBlur}
                keyboardType="numeric"
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
      </ThemedBox>

      {errors.root && (
        <ThemedView className="rounded-lg p-3 border border-error-500 bg-error-50">
          <ThemedText type="default" className="text-xs text-error-700">
            {errors.root.message}
          </ThemedText>
        </ThemedView>
      )}

      <HStack className="gap-2">
        {onCancel && (
          <ThemedButton
            onPress={onCancel}
            disabled={isSubmitting}
            variant="outline"
            className="flex-1"
          >
            <Text className="font-semibold">Скасувати</Text>
          </ThemedButton>
        )}
        <ThemedButton
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          variant="create"
          className="flex-1"
        >
          {isSubmitting ? (
            <ActivityIndicator color={staticColors.white} />
          ) : (
            <Text className="text-white font-semibold">Створити</Text>
          )}
        </ThemedButton>
      </HStack>
    </ThemedBox>
  );
}
