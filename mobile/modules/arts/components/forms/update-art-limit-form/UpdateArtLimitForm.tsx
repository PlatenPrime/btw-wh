import { ThemedInput, ThemedInputField } from "@/components/themed";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedView } from "@/components/themed/themed-view";
import { SemanticColors } from "@/constants/theme";
import { useUpdateArtLimitMutation } from "@/modules/arts/api/hooks/mutations/useUpdateArtLimitMutation";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { useTheme } from "@/providers/theme-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { updateArtLimitSchema, type UpdateArtLimitFormData } from "./schema";

interface UpdateArtLimitFormProps {
  artData: ArtDto;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateArtLimitForm({
  artData,
  onSuccess,
  onCancel,
}: UpdateArtLimitFormProps) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const placeholder = SemanticColors.placeholder[theme];

  const form = useForm<UpdateArtLimitFormData>({
    resolver: zodResolver(updateArtLimitSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      limit: artData.limit || 0,
    },
  });

  const updateMutation = useUpdateArtLimitMutation({
    artikul: artData.artikul,
  });
  const isSubmitting = updateMutation.isPending;

  const onSubmit = async (data: UpdateArtLimitFormData) => {
    try {
      await updateMutation.mutateAsync({
        id: artData._id,
        data: { limit: data.limit },
      });
      onSuccess();
    } catch (error) {
      console.error("Помилка оновлення ліміту:", error);
      form.setError("root", {
        message:
          error instanceof Error ? error.message : "Помилка оновлення ліміту",
      });
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const limitValue = watch("limit");

  const handleLimitChange = (value: string) => {
    const numValue = value === "" ? 0 : Number(value);
    setValue("limit", numValue, {
      shouldValidate: true,
    });
  };

  return (
    <View className="gap-4">
      <View className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Ліміт артикулу *
        </ThemedText>
        <Controller
          control={control}
          name="limit"
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedInput
              className={`rounded-lg border bg-background-0 ${
                errors.limit ? "border-error-500" : "border-outline-50"
              }`}
            >
              <ThemedInputField
                placeholder="Введіть ліміт"
                placeholderTextColor={placeholder}
                keyboardType="numeric"
                value={limitValue === 0 ? "" : limitValue.toString()}
                onChangeText={(text) => {
                  handleLimitChange(text);
                  onChange(text === "" ? 0 : Number(text));
                }}
                onBlur={onBlur}
                autoFocus
                editable={!isSubmitting}
                className="text-typography-900"
              />
            </ThemedInput>
          )}
        />
        {errors.limit && (
          <ThemedText type="default" className="text-xs text-error-600">
            {errors.limit.message}
          </ThemedText>
        )}
      </View>

      {errors.root && (
        <ThemedView className="rounded-lg p-3 border border-error-500 bg-error-50">
          <ThemedText type="default" className="text-xs text-error-700">
            {errors.root.message}
          </ThemedText>
        </ThemedView>
      )}

      <View className="flex-row gap-2">
        <TouchableOpacity
          className="flex-1 rounded-lg py-3 items-center justify-center border border-outline-50 bg-background-0"
          onPress={onCancel}
          disabled={isSubmitting}
        >
          <ThemedText type="defaultSemiBold">Скасувати</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 rounded-lg py-3 items-center justify-center"
          style={{
            backgroundColor: isSubmitting
              ? SemanticColors.disabled
              : SemanticColors.primary,
            opacity: isSubmitting ? 0.5 : 1,
          }}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color={SemanticColors.white} />
          ) : (
            <ThemedText
              type="defaultSemiBold"
              style={{ color: SemanticColors.white }}
            >
              Зберегти
            </ThemedText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
