import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ScrollView, Box, Text, Input, InputField, Button, ButtonText, ButtonSpinner } from "@/components/ui";
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
      <Box className="w-full max-w-sm bg-background-0 rounded-xl border border-outline-200 p-6 gap-4">
        <Text className="text-2xl font-semibold text-center text-typography-900">
          Авторизація
        </Text>

        {errors.root && (
          <Box className="bg-error-100 border border-error-300 rounded-lg p-3">
            <Text className="text-error-700 text-sm">{errors.root.message}</Text>
          </Box>
        )}

        {error && (
          <Box className="bg-error-100 border border-error-300 rounded-lg p-3">
            <Text className="text-error-700 text-sm">{error}</Text>
          </Box>
        )}

        <Box className="gap-2">
          <Text className="text-sm font-medium text-typography-700">Логін</Text>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="bg-background-50 border border-outline-200 rounded-lg">
                <InputField
                  placeholder="Введіть логін"
                  placeholderTextColor="#9CA3AF"
                  autoComplete="username"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoading}
                />
              </Input>
            )}
          />
          {errors.username && (
            <Text className="text-error-600 text-sm">{errors.username.message}</Text>
          )}
        </Box>

        <Box className="gap-2">
          <Text className="text-sm font-medium text-typography-700">Пароль</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="bg-background-50 border border-outline-200 rounded-lg">
                <InputField
                  placeholder="Введіть пароль"
                  placeholderTextColor="#9CA3AF"
                  autoComplete="current-password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoading}
                />
              </Input>
            )}
          />
          {errors.password && (
            <Text className="text-error-600 text-sm">{errors.password.message}</Text>
          )}
        </Box>

        <Button
          className="w-full bg-primary-500 rounded-lg py-3 items-center justify-center"
          onPress={handleSubmit(onSubmit)}
          isDisabled={isLoading}
        >
          {isLoading ? (
            <ButtonSpinner color="#FFFFFF" />
          ) : (
            <ButtonText className="text-white font-semibold text-base">Вхід</ButtonText>
          )}
        </Button>
      </Box>
    </ScrollView>
  );
};

