import { GlassCard } from "@/components/shared/glass-card";
import {
  ThemedBox,
  ThemedButton,
  ThemedInput,
  ThemedInputField,
  ThemedInputIcon,
  ThemedInputSlot,
  ThemedScrollView,
  ThemedText,
} from "@/components/themed";
import { SemanticColors } from "@/constants/theme";
import { useIconColor } from "@/hooks/use-icon-color";
import { useTheme } from "@/providers/theme-provider";
import type { UseFormReturn } from "react-hook-form";
import { Controller } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import type { LoginFormValues } from "./schema";

export interface LoginFormViewProps {
  form: UseFormReturn<LoginFormValues>;
  showPassword: boolean;
  onTogglePassword: () => void;
  isLoading: boolean;
  error: string | null;
  onSubmit: (data: LoginFormValues) => void;
}

export function LoginFormView({
  form,
  showPassword,
  onTogglePassword,
  isLoading,
  error,
  onSubmit,
}: LoginFormViewProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const placeholder = SemanticColors.placeholder[theme];
  const iconColor = useIconColor();

  return (
    <ThemedScrollView
      contentContainerClassName="flex-1 justify-center items-center p-6"
      keyboardShouldPersistTaps="handled"
    >
      <GlassCard className="w-full max-w-sm p-6 gap-4">
        <ThemedText className="text-2xl font-semibold text-center text-typography-900">
          Авторизація
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
          <ThemedText className="text-lg font-semibold text-typography-700">
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
          <ThemedText className="text-lg font-semibold text-typography-700">
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
                  autoComplete="current-password"
                  secureTextEntry={!showPassword}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoading}
                />
                <ThemedInputSlot onPress={onTogglePassword}>
                  <ThemedInputIcon
                    family="FontAwesome5"
                    name={showPassword ? "eye" : "eye-slash"}
                    size={22}
                    color={iconColor}
                  />
                </ThemedInputSlot>
              </ThemedInput>
            )}
          />
          {errors.password && (
            <ThemedText className="text-error-600 text-sm">
              {errors.password.message}
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
              Вхід
            </ThemedText>
          )}
        </ThemedButton>
      </GlassCard>
    </ThemedScrollView>
  );
}
