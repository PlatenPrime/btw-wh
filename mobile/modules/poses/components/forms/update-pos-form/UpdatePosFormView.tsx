import {
  ThemedBox,
  ThemedButton,
  ThemedHStack,
  ThemedIcon,
  ThemedInput,
  ThemedInputField,
  ThemedPressable,
  ThemedText as ThemedTextButton,
} from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { sklads } from "@/constants/sklad";
import { SemanticColors } from "@/constants/theme";
import { useIconColor } from "@/hooks/use-icon-color";
import { useTheme } from "@/providers/theme-provider";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import type { UpdatePosFormData } from "./schema";

interface UpdatePosFormViewProps {
  form: UseFormReturn<UpdatePosFormData>;
  isSubmitting: boolean;
  onSubmit: (data: UpdatePosFormData) => void;
  onCancel?: () => void;
}

export function UpdatePosFormView({
  form,
  isSubmitting,
  onSubmit,
  onCancel,
}: UpdatePosFormViewProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const iconColor = useIconColor();
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const placeholder = SemanticColors.placeholder[theme];

  return (
    <ThemedBox className="gap-4">
      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Кількість *
        </ThemedText>
        <Controller
          control={control}
          name="quant"
          render={({ field: { onChange, onBlur, value } }) => {
            const handleChange = (text: string) => {
              // Обрабатываем значение через кастомный обработчик
              const numericValue = text.replace(/\D/g, "");

              let processedValue: string;
              if (numericValue === "") {
                processedValue = "";
              } else if (numericValue === "0") {
                processedValue = "0";
              } else {
                processedValue = numericValue.replace(/^0+/, "");
              }

              // Обновляем через field.onChange
              onChange(processedValue);
            };

            return (
              <ThemedInput
                className={`rounded-lg border bg-background-0 ${
                  errors.quant ? "border-error-500" : "border-outline-50"
                }`}
              >
                <ThemedInputField
                  placeholder="Введіть кількість"
                  placeholderTextColor={placeholder}
                  value={value || ""}
                  onChangeText={handleChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  editable={!isSubmitting}
                  className="text-typography-900"
                />
              </ThemedInput>
            );
          }}
        />
        {errors.quant && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.quant.message}
          </ThemedText>
        )}
      </ThemedBox>

      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Коробки *
        </ThemedText>
        <Controller
          control={control}
          name="boxes"
          render={({ field: { onChange, onBlur, value } }) => {
            const handleChange = (text: string) => {
              // Обрабатываем значение через кастомный обработчик
              const numericValue = text.replace(/\D/g, "");

              let processedValue: string;
              if (numericValue === "") {
                processedValue = "";
              } else if (numericValue === "0") {
                processedValue = "0";
              } else {
                processedValue = numericValue.replace(/^0+/, "");
              }

              // Обновляем через field.onChange
              onChange(processedValue);
            };

            return (
              <ThemedInput
                className={`rounded-lg border bg-background-0 ${
                  errors.boxes ? "border-error-500" : "border-outline-50"
                }`}
              >
                <ThemedInputField
                  placeholder="Введіть кількість коробок"
                  placeholderTextColor={placeholder}
                  value={value || ""}
                  onChangeText={handleChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  editable={!isSubmitting}
                  className="text-typography-900"
                />
              </ThemedInput>
            );
          }}
        />
        {errors.boxes && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.boxes.message}
          </ThemedText>
        )}
      </ThemedBox>

      <ThemedBox className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Склад *
        </ThemedText>
        <Controller
          control={control}
          name="sklad"
          render={({ field: { onChange, value } }) => (
            <ThemedBox className="gap-2">
              {Object.entries(sklads).map(([key, label]) => {
                const isSelected = value === key;
                return (
                  <ThemedPressable
                    key={key}
                    onPress={() => !isSubmitting && onChange(key)}
                    className={`flex-row items-center justify-between p-3 rounded-lg border ${
                      isSelected
                        ? "border-info-500 bg-info-50"
                        : "border-outline-50 bg-background-0"
                    }`}
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.5 : 1 }}
                  >
                    <ThemedText
                      type="default"
                      className={
                        isSelected ? "text-info-700" : "text-typography-900"
                      }
                    >
                      {label}
                    </ThemedText>
                    <ThemedIcon
                      family="MaterialIcons"
                      name={
                        isSelected
                          ? "radio-button-checked"
                          : "radio-button-unchecked"
                      }
                      size={20}
                      color={isSelected ? SemanticColors.info : iconColor}
                    />
                  </ThemedPressable>
                );
              })}
            </ThemedBox>
          )}
        />
        {errors.sklad && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.sklad.message}
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
          <ThemedTextButton className="font-semibold">
            Скасувати
          </ThemedTextButton>
        </ThemedButton>
        <ThemedButton
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          variant="confirm"
          className="flex-1"
        >
          {isSubmitting ? (
            <ActivityIndicator color={SemanticColors.white} />
          ) : (
            <ThemedTextButton className="text-white font-semibold">
              Оновити
            </ThemedTextButton>
          )}
        </ThemedButton>
      </ThemedHStack>
    </ThemedBox>
  );
}
