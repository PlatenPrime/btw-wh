import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  Box,
  Button,
  ButtonSpinner,
  ButtonText,
  HStack,
  Input,
  InputField,
} from "@/components/ui";
import type { RowFormValues } from "@/modules/rows/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { SemanticColors } from "@/constants/theme";

interface CreateRowFormViewProps {
  form: UseFormReturn<RowFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: RowFormValues) => void;
  onCancel?: () => void;
}

export function CreateRowFormView({
  form,
  isSubmitting,
  onSubmit,
  onCancel,
}: CreateRowFormViewProps) {
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
                errors.title ? "border-error-500" : "border-outline-200"
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
        {onCancel && (
          <Button
            onPress={onCancel}
            isDisabled={isSubmitting}
            className="flex-1 rounded-lg border border-outline-200 bg-background-0 items-center justify-center py-3 "
            style={{ opacity: isSubmitting ? 0.5 : 1 }}
          >
            <ButtonText>
              <ThemedText type="defaultSemiBold">Скасувати</ThemedText>
            </ButtonText>
          </Button>
        )}
        <Button
          onPress={handleSubmit(onSubmit)}
          isDisabled={isSubmitting}
          className="flex-1 rounded-lg items-center justify-center py-3"
          style={{ 
            opacity: isSubmitting ? 0.5 : 1,
            backgroundColor: isSubmitting ? SemanticColors.disabled : SemanticColors.primary
          }}
        >
          {isSubmitting ? (
            <ButtonSpinner color={SemanticColors.white} />
          ) : (
            <ButtonText>
              <ThemedText type="defaultSemiBold" className="text-white">
                Створити
              </ThemedText>
            </ButtonText>
          )}
        </Button>
      </HStack>
    </Box>
  );
}
