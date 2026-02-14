import { GlassCard } from "@/components/shared/glass-card";
import {
  ThemedBox,
  ThemedButton,
  ThemedInput,
  ThemedInputField,
  ThemedScrollView,
  ThemedText,
} from "@/components/themed";
import { SemanticColors } from "@/constants/theme";
import { useTheme } from "@/providers/theme-provider";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import type { RegisterFormValues } from "./schema";

export interface RegisterFormViewProps {
  form: UseFormReturn<RegisterFormValues>;
  isLoading: boolean;
  error: string | null;
  onSubmit: (data: RegisterFormValues) => void;
}

export function RegisterFormView({
  form,
  isLoading,
  error,
  onSubmit,
}: RegisterFormViewProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const placeholder = SemanticColors.placeholder[theme];

  return (
    <ThemedScrollView
      contentContainerClassName="flex-1 justify-center items-center p-6"
      keyboardShouldPersistTaps="handled"
    >
      <GlassCard className="w-full max-w-sm p-6 gap-4">
        <ThemedText className="text-2xl font-semibold text-center text-typography-900">
          Реєстрація
        </ThemedText>

        {errors.root && (
          <ThemedBox className="bg-error-100 border border-error-300 rounded-lg p-3">
            <ThemedText className="text-error-700 text-sm">
              {errors.root.message}
            </ThemedText>
          </ThemedBox>
        )}

        {error && (
          <ThemedBox className="bg-error-100 border border-error-300 rounded-lg p-3">
            <ThemedText className="text-error-700 text-sm">{error}</ThemedText>
          </ThemedBox>
        )}

        <ThemedBox className="gap-2">
          <ThemedText className="text-sm font-medium text-typography-700">
            Логін
          </ThemedText>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput className="bg-background-50 border border-outline-50 rounded-lg">
                <ThemedInputField
                  placeholder="Введіть логін"
                  placeholderTextColor={placeholder}
                  autoComplete="username"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoading}
                />
              </ThemedInput>
            )}
          />
          {errors.username && (
            <ThemedText className="text-error-600 text-sm">
              {errors.username.message}
            </ThemedText>
          )}
        </ThemedBox>

        <ThemedBox className="gap-2">
          <ThemedText className="text-sm font-medium text-typography-700">
            Пароль
          </ThemedText>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput className="bg-background-50 border border-outline-50 rounded-lg">
                <ThemedInputField
                  placeholder="Введіть пароль"
                  placeholderTextColor={placeholder}
                  autoComplete="new-password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoading}
                />
              </ThemedInput>
            )}
          />
          {errors.password && (
            <ThemedText className="text-error-600 text-sm">
              {errors.password.message}
            </ThemedText>
          )}
        </ThemedBox>

        <ThemedBox className="gap-2">
          <ThemedText className="text-sm font-medium text-typography-700">
            Повне ім&apos;я
          </ThemedText>
          <Controller
            control={control}
            name="fullname"
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput className="bg-background-50 border border-outline-50 rounded-lg">
                <ThemedInputField
                  placeholder="Введіть повне ім'я"
                  placeholderTextColor={placeholder}
                  autoComplete="name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoading}
                />
              </ThemedInput>
            )}
          />
          {errors.fullname && (
            <ThemedText className="text-error-600 text-sm">
              {errors.fullname.message}
            </ThemedText>
          )}
        </ThemedBox>

        <ThemedBox className="gap-2">
          <ThemedText className="text-sm font-medium text-typography-700">
            Роль (необов&apos;язково)
          </ThemedText>
          <Controller
            control={control}
            name="role"
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput className="bg-background-50 border border-outline-50 rounded-lg">
                <ThemedInputField
                  placeholder="USER, ADMIN, PRIME"
                  placeholderTextColor={placeholder}
                  autoCapitalize="characters"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoading}
                />
              </ThemedInput>
            )}
          />
        </ThemedBox>

        <ThemedBox className="gap-2">
          <ThemedText className="text-sm font-medium text-typography-700">
            Telegram (необов&apos;язково)
          </ThemedText>
          <Controller
            control={control}
            name="telegram"
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput className="bg-background-50 border border-outline-50 rounded-lg">
                <ThemedInputField
                  placeholder="Введіть telegram"
                  placeholderTextColor={placeholder}
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoading}
                />
              </ThemedInput>
            )}
          />
        </ThemedBox>

        <ThemedBox className="gap-2">
          <ThemedText className="text-sm font-medium text-typography-700">
            URL фото (необов&apos;язково)
          </ThemedText>
          <Controller
            control={control}
            name="photo"
            render={({ field: { onChange, onBlur, value } }) => (
              <ThemedInput className="bg-background-50 border border-outline-50 rounded-lg">
                <ThemedInputField
                  placeholder="https://example.com/photo.jpg"
                  placeholderTextColor={placeholder}
                  autoCapitalize="none"
                  keyboardType="url"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoading}
                />
              </ThemedInput>
            )}
          />
          {errors.photo && (
            <ThemedText className="text-error-600 text-sm">
              {errors.photo.message}
            </ThemedText>
          )}
        </ThemedBox>

        <ThemedButton
          className="w-full"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={SemanticColors.white} />
          ) : (
            <ThemedText className="text-white font-semibold text-base">
              Зареєструватися
            </ThemedText>
          )}
        </ThemedButton>
      </GlassCard>
    </ThemedScrollView>
  );
}
