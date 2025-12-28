import { Box, Input, InputField, Button, HStack, Text } from "@/components/ui";
import { ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import type { RowFormValues } from "@/modules/rows/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { SemanticColors } from "@/constants/theme";

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

  return (
    <Box className="gap-4">
      <Box className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Назва ряду *
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
                placeholder="XX-XX"
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

