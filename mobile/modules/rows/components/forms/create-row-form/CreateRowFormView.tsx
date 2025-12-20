import { View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import type { RowFormValues } from "@/modules/rows/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";

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
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "light" ? "#fff" : "#1f2937";
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";
  const textColor = colorScheme === "light" ? Colors.light.text : Colors.dark.text;
  const placeholderColor = colorScheme === "light" ? "#9ca3af" : "#6b7280";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <View className="gap-4">
      <View className="gap-2">
        <ThemedText type="defaultSemiBold" className="text-sm">
          Назва ряду *
        </ThemedText>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="rounded-lg px-4 py-3 border"
              style={{
                backgroundColor: bgColor,
                borderColor: errors.title ? "#ef4444" : borderColor,
                color: textColor,
              }}
              placeholder="XX-XX"
              placeholderTextColor={placeholderColor}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoFocus
              editable={!isSubmitting}
            />
          )}
        />
        {errors.title && (
          <ThemedText type="default" className="text-xs" style={{ color: "#ef4444" }}>
            {errors.title.message}
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
        {onCancel && (
          <TouchableOpacity
            onPress={onCancel}
            disabled={isSubmitting}
            className="flex-1 rounded-lg px-4 py-3 border items-center justify-center"
            style={{
              backgroundColor: bgColor,
              borderColor: borderColor,
              opacity: isSubmitting ? 0.5 : 1,
            }}
          >
            <ThemedText type="defaultSemiBold">Скасувати</ThemedText>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="flex-1 rounded-lg px-4 py-3 items-center justify-center"
          style={{
            backgroundColor: "#3b82f6",
            opacity: isSubmitting ? 0.5 : 1,
          }}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText type="defaultSemiBold" style={{ color: "#fff" }}>
              Створити
            </ThemedText>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

