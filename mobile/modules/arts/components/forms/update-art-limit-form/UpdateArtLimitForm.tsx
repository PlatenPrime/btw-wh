import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, SemanticColors } from "@/constants/theme";
import { useUpdateArtLimitMutation } from "@/modules/arts/api/hooks/mutations/useUpdateArtLimitMutation";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import {
  updateArtLimitSchema,
  type UpdateArtLimitFormData,
} from "./schema";

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
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "light" ? SemanticColors.dialog.bg.light : SemanticColors.dialog.bg.dark;
  const borderColor = colorScheme === "light" ? SemanticColors.dialog.border.light : SemanticColors.dialog.border.dark;
  const textColor = colorScheme === "light" ? Colors.light.text : Colors.dark.text;
  const placeholderColor = colorScheme === "light" ? SemanticColors.placeholder.light : SemanticColors.placeholder.dark;

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
          error instanceof Error
            ? error.message
            : "Помилка оновлення ліміту",
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
            <TextInput
              className="rounded-lg px-4 py-3 border"
              style={{
                backgroundColor: bgColor,
                borderColor: errors.limit ? SemanticColors.error.border : borderColor,
                color: textColor,
              }}
              placeholder="Введіть ліміт"
              placeholderTextColor={placeholderColor}
              keyboardType="numeric"
              value={limitValue === 0 ? "" : limitValue.toString()}
              onChangeText={(text) => {
                handleLimitChange(text);
                onChange(text === "" ? 0 : Number(text));
              }}
              onBlur={onBlur}
              autoFocus
              editable={!isSubmitting}
            />
          )}
        />
        {errors.limit && (
          <ThemedText type="default" className="text-xs" style={{ color: SemanticColors.error.text }}>
            {errors.limit.message}
          </ThemedText>
        )}
      </View>

      {errors.root && (
        <ThemedView
          className="rounded-lg p-3 border"
          style={{
            backgroundColor: colorScheme === "light" ? SemanticColors.error.bg.light : SemanticColors.error.bg.dark,
            borderColor: SemanticColors.error.border,
          }}
        >
          <ThemedText type="default" className="text-xs" style={{ color: SemanticColors.error.text }}>
            {errors.root.message}
          </ThemedText>
        </ThemedView>
      )}

      <View className="flex-row gap-2">
        <TouchableOpacity
          className="flex-1 rounded-lg py-3 items-center justify-center border"
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
          }}
          onPress={onCancel}
          disabled={isSubmitting}
        >
          <ThemedText type="defaultSemiBold">Скасувати</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 rounded-lg py-3 items-center justify-center"
          style={{
            backgroundColor: isSubmitting ? SemanticColors.disabled : SemanticColors.primary,
            opacity: isSubmitting ? 0.5 : 1,
          }}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color={SemanticColors.white} />
          ) : (
            <ThemedText type="defaultSemiBold" style={{ color: SemanticColors.white }}>
              Зберегти
            </ThemedText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

