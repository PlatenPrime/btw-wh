import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { View, TextInput, Pressable, Text, ActivityIndicator, ScrollView } from "react-native";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";

// Zod schema for login form
const loginSchema = z.object({
  username: z.string().min(3, "Логін мінімум три букви"),
  password: z.string().min(3, "Пароль мінімум три букви"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
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
    <ScrollView
      contentContainerClassName="flex-1 justify-center items-center p-6"
      keyboardShouldPersistTaps="handled"
    >
      <View className="w-full max-w-sm bg-background-0 rounded-xl border border-outline-200 p-6 gap-4">
        <Text className="text-2xl font-semibold text-center text-typography-900">
          Авторизація
        </Text>

        {errors.root && (
          <View className="bg-error-100 border border-error-300 rounded-lg p-3">
            <Text className="text-error-700 text-sm">{errors.root.message}</Text>
          </View>
        )}

        {error && (
          <View className="bg-error-100 border border-error-300 rounded-lg p-3">
            <Text className="text-error-700 text-sm">{error}</Text>
          </View>
        )}

        <View className="gap-2">
          <Text className="text-sm font-medium text-typography-700">Логін</Text>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-background-50 border border-outline-200 rounded-lg px-4 py-3 text-typography-900"
                placeholder="Введіть логін"
                placeholderTextColor="#9CA3AF"
                autoComplete="username"
                autoCapitalize="none"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                editable={!isLoading}
              />
            )}
          />
          {errors.username && (
            <Text className="text-error-600 text-sm">{errors.username.message}</Text>
          )}
        </View>

        <View className="gap-2">
          <Text className="text-sm font-medium text-typography-700">Пароль</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="bg-background-50 border border-outline-200 rounded-lg px-4 py-3 text-typography-900"
                placeholder="Введіть пароль"
                placeholderTextColor="#9CA3AF"
                autoComplete="current-password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                editable={!isLoading}
              />
            )}
          />
          {errors.password && (
            <Text className="text-error-600 text-sm">{errors.password.message}</Text>
          )}
        </View>

        <Pressable
          className={`w-full bg-primary-500 rounded-lg py-3 items-center justify-center ${
            isLoading ? "opacity-50" : ""
          }`}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white font-semibold text-base">Вхід</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};

