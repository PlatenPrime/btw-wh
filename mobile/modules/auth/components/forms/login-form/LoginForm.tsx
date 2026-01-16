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
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { useTheme } from "@/providers/theme-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import { z } from "zod";

// Zod schema for login form
const loginSchema = z.object({
  username: z.string().min(3, "Логін мінімум три букви"),
  password: z.string().min(3, "Пароль мінімум три букви"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const placeholder = SemanticColors.placeholder[theme];
  const iconColor = useIconColor();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.username, data.password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("root", { message: err.message });
      } else {
        setError("root", { message: "Сталася невідома помилка" });
      }
    }
  };

  return (
    <ThemedScrollView
      contentContainerClassName="flex-1 justify-center items-center p-6"
      keyboardShouldPersistTaps="handled"
    >
      <ThemedBox className="w-full max-w-sm bg-background-0 rounded-xl border border-outline-50 p-6 gap-4">
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
                  autoComplete="current-password"
                  secureTextEntry={!showPassword}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoading}
                />
                <ThemedInputSlot onPress={() => setShowPassword(!showPassword)}>
                  <ThemedInputIcon
                    family="FontAwesome5"
                    name={showPassword ? "eye-slash" : "eye"}
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
      </ThemedBox>
    </ThemedScrollView>
  );
};
