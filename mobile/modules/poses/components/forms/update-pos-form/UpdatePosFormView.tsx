import { Box, Input, InputField, HStack, Button, ButtonText, ButtonSpinner, Pressable } from "@/components/ui";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Icon } from "@/components/ui/icon";
import type { UpdatePosFormData } from "./schema";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { SemanticColors } from "@/constants/theme";
import { sklads, type ISklads } from "@/constants/sklad";
import { useIconColor } from "@/hooks/use-icon-color";

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

  return (
    <Box className="gap-4">
      <Box className="gap-2">
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
              <Input
                className={`rounded-lg border bg-background-0 ${
                  errors.quant ? "border-error-500" : "border-outline-200"
                }`}
              >
                <InputField
                  placeholder="Введіть кількість"
                  placeholderTextColor={SemanticColors.placeholder.light}
                  value={value || ""}
                  onChangeText={handleChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  editable={!isSubmitting}
                  className="text-typography-900"
                />
              </Input>
            );
          }}
        />
        {errors.quant && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.quant.message}
          </ThemedText>
        )}
      </Box>

      <Box className="gap-2">
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
              <Input
                className={`rounded-lg border bg-background-0 ${
                  errors.boxes ? "border-error-500" : "border-outline-200"
                }`}
              >
                <InputField
                  placeholder="Введіть кількість коробок"
                  placeholderTextColor={SemanticColors.placeholder.light}
                  value={value || ""}
                  onChangeText={handleChange}
                  onBlur={onBlur}
                  keyboardType="numeric"
                  editable={!isSubmitting}
                  className="text-typography-900"
                />
              </Input>
            );
          }}
        />
        {errors.boxes && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.boxes.message}
          </ThemedText>
        )}
      </Box>

      <Box className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Склад *
        </ThemedText>
        <Controller
          control={control}
          name="sklad"
          render={({ field: { onChange, value } }) => (
            <Box className="gap-2">
              {Object.entries(sklads).map(([key, label]) => {
                const isSelected = value === key;
                return (
                  <Pressable
                    key={key}
                    onPress={() => !isSubmitting && onChange(key)}
                    className={`flex-row items-center justify-between p-3 rounded-lg border ${
                      isSelected
                        ? "border-info-500 bg-info-50"
                        : "border-outline-200 bg-background-0"
                    }`}
                    disabled={isSubmitting}
                    opacity={isSubmitting ? 0.5 : 1}
                  >
                    <ThemedText
                      type="default"
                      className={isSelected ? "text-info-700" : "text-typography-900"}
                    >
                      {label}
                    </ThemedText>
                    <Icon
                      family="MaterialIcons"
                      name={isSelected ? "radio-button-checked" : "radio-button-unchecked"}
                      size={20}
                      color={isSelected ? SemanticColors.info : iconColor}
                    />
                  </Pressable>
                );
              })}
            </Box>
          )}
        />
        {errors.sklad && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.sklad.message}
          </ThemedText>
        )}
      </Box>

      {errors.root && (
        <ThemedView className="rounded-lg p-3 border border-error-500 bg-error-50">
          <ThemedText type="default" className="text-xs text-error-700">
            {errors.root.message}
          </ThemedText>
        </ThemedView>
      )}

      <HStack className="gap-2">
        <Button
          onPress={onCancel}
          isDisabled={isSubmitting}
          className="flex-1 rounded-lg border border-outline-200 bg-background-0 items-center justify-center py-3"
          style={{ opacity: isSubmitting ? 0.5 : 1 }}
        >
          <ButtonText>
            <ThemedText type="defaultSemiBold">Скасувати</ThemedText>
          </ButtonText>
        </Button>
        <Button
          onPress={handleSubmit(onSubmit)}
          isDisabled={isSubmitting}
          variant="solid"
          action="primary"
          className="flex-1 rounded-lg items-center justify-center py-3"
          style={{
            opacity: isSubmitting ? 0.5 : 1,
          }}
        >
          {isSubmitting ? (
            <ButtonSpinner color={SemanticColors.white} />
          ) : (
            <ButtonText>
              <ThemedText type="defaultSemiBold" className="text-white">
                Оновити
              </ThemedText>
            </ButtonText>
          )}
        </Button>
      </HStack>
    </Box>
  );
}

