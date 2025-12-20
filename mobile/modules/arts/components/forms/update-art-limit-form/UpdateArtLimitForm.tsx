import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
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
  const bgColor = colorScheme === "light" ? "#fff" : "#1f2937";
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";
  const textColor = colorScheme === "light" ? Colors.light.text : Colors.dark.text;
  const placeholderColor = colorScheme === "light" ? "#9ca3af" : "#6b7280";

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
                borderColor: errors.limit ? "#ef4444" : borderColor,
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
          <ThemedText type="default" className="text-xs" style={{ color: "#ef4444" }}>
            {errors.limit.message}
          </ThemedText>
        )}
      </View>

      {errors.root && (
        <ThemedView
          className="rounded-lg p-3 border"
          style={{
            backgroundColor: colorScheme === "light" ? "#fee2e2" : "#7f1d1d",
            borderColor: "#ef4444",
          }}
        >
          <ThemedText type="default" className="text-xs" style={{ color: "#ef4444" }}>
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
            backgroundColor: isSubmitting ? "#9ca3af" : "#3b82f6",
            opacity: isSubmitting ? 0.5 : 1,
          }}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <ThemedText type="defaultSemiBold" style={{ color: "#FFFFFF" }}>
              Зберегти
            </ThemedText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

