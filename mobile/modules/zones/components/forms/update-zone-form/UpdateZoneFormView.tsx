import {
  ThemedBox,
  ThemedButton,
  ThemedHStack,
  ThemedInput,
  ThemedInputField,
  ThemedText,
  ThemedView,
} from "@/components/themed";
import { NumericDraftField } from "@/components/shared/numeric-draft-field";
import { SemanticColors } from "@/constants/theme";
import type { UpdateZoneFormValues } from "@/modules/zones/components/forms/schema";
import { useTheme } from "@/providers/theme-provider";
import {
  filterDigitsInput,
  normalizeDigitsInput,
} from "@/utils/quant-input";
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
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const placeholder = SemanticColors.placeholder[theme];

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
                errors.title ? "border-error-500" : "border-outline-50"
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
            <NumericDraftField
              value={value ? String(value) : ""}
              onChange={(next) => {
                if (next === "") {
                  onChange(undefined);
                  return;
                }
                const num = Number.parseInt(next, 10);
                if (!Number.isNaN(num)) onChange(num);
              }}
              onBlur={onBlur}
              filter={filterDigitsInput}
              normalize={normalizeDigitsInput}
              placeholder="420502"
              placeholderTextColor={placeholder}
              editable={!isSubmitting}
              error={!!errors.bar}
            />
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
            <NumericDraftField
              value={value != null ? String(value) : ""}
              onChange={(next) => {
                if (next === "") {
                  onChange(undefined);
                  return;
                }
                const num = Number.parseInt(next, 10);
                if (!Number.isNaN(num)) onChange(num);
              }}
              onBlur={onBlur}
              filter={filterDigitsInput}
              normalize={normalizeDigitsInput}
              placeholder="0"
              placeholderTextColor={placeholder}
              editable={!isSubmitting}
              error={!!errors.sector}
            />
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
            <ActivityIndicator color={SemanticColors.white} />
          ) : (
            <ThemedText className="text-white font-semibold">
              Оновити
            </ThemedText>
          )}
        </ThemedButton>
      </ThemedHStack>
    </ThemedBox>
  );
}
