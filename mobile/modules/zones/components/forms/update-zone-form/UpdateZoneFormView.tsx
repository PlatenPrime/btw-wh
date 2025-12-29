import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  Box,
  Button,
  HStack,
  Input,
  InputField,
  Text,
} from "@/components/ui";
import { ActivityIndicator } from "react-native";
import type { UpdateZoneFormValues } from "@/modules/zones/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { SemanticColors } from "@/constants/theme";

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

  return (
    <Box className="gap-4">
      <Box className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Назва зони
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
                placeholderTextColor={SemanticColors.placeholder.light}
                value={value || ""}
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
          Штрих-код
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
                placeholderTextColor={SemanticColors.placeholder.light}
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
            </Input>
          )}
        />
        {errors.bar && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.bar.message}
          </ThemedText>
        )}
      </Box>

      <Box className="gap-2">
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
                placeholderTextColor={SemanticColors.placeholder.light}
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
            </Input>
          )}
        />
        {errors.sector && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.sector.message}
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
          disabled={isSubmitting}
          variant="outline"
          className="flex-1"
        >
          <Text className="font-semibold">Скасувати</Text>
        </Button>
        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          variant="confirm"
          className="flex-1"
        >
          {isSubmitting ? (
            <ActivityIndicator color={SemanticColors.white} />
          ) : (
            <Text className="text-white font-semibold">Оновити</Text>
          )}
        </Button>
      </HStack>
    </Box>
  );
}

