import {
  ThemedBox,
  ThemedButton,
  ThemedInput,
  ThemedInputField,
  ThemedText,
  ThemedText as ThemedTextButton,
} from "@/components/themed";
import { RoleType } from "@/constants/roles";
import { SemanticColors } from "@/constants/theme";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { RegisterData } from "@/modules/auth/api/types";
import { useTheme } from "@/providers/theme-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView } from "react-native";
import { z } from "zod";

// Zod schema for register form
const registerSchema = z.object({
  username: z.string().min(3, "Логін повинен містити мінімум 3 символи"),
  password: z.string().min(6, "Пароль повинен містити мінімум 6 символів"),
  fullname: z.string().min(2, "Повне ім'я повинно містити мінімум 2 символи"),
  role: z.union([z.nativeEnum(RoleType), z.literal("")]).optional(),
  telegram: z.string().optional(),
  photo: z
    .string()
    .url("Будь ласка, введіть правильну URL адресу")
    .optional()
    .or(z.literal("")),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const { register: registerUser, isLoading, error } = useAuth();
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const placeholder = SemanticColors.placeholder[theme];
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      fullname: "",
      role: "",
      telegram: "",
      photo: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      // Преобразуем пустую строку в undefined для role
      const registerData: RegisterData = {
        ...data,
        role:
          data.role === "" ? undefined : (data.role as RoleType | undefined),
        telegram: data.telegram === "" ? undefined : data.telegram,
        photo: data.photo === "" ? undefined : data.photo,
      };
      await registerUser(registerData);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("root", { message: err.message });
      } else {
        setError("root", { message: "Сталася невідома помилка" });
      }
    }
  };

  return (
    <ScrollView
      contentContainerClassName="flex-1 justify-center items-center p-6"
      keyboardShouldPersistTaps="handled"
    >
      <ThemedBox className="w-full max-w-sm bg-background-0 rounded-xl border border-outline-50 p-6 gap-4">
        <ThemedText className="text-2xl font-semibold text-typography-900">
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
            <ThemedTextButton className="text-white font-semibold text-base">
              Зареєструватися
            </ThemedTextButton>
          )}
        </ThemedButton>
      </ThemedBox>
    </ScrollView>
  );
};
