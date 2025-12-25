import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ScrollView, Box, Text, Input, InputField, Button } from "@/components/ui";
import { ActivityIndicator } from "react-native";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { RoleType } from "@/constants/roles";
import type { RegisterData } from "@/modules/auth/api/types";
import { SemanticColors } from "@/constants/theme";

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
      <Box className="w-full max-w-sm bg-background-0 rounded-xl border border-outline-200 p-6 gap-4">
        <Text className="text-2xl font-semibold text-typography-900">
          Реєстрація
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
                  placeholderTextColor={SemanticColors.placeholder.light}
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
                  placeholderTextColor={SemanticColors.placeholder.light}
                  autoComplete="new-password"
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

        <Box className="gap-2">
          <Text className="text-sm font-medium text-typography-700">Повне ім'я</Text>
          <Controller
            control={control}
            name="fullname"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="bg-background-50 border border-outline-200 rounded-lg">
                <InputField
                  placeholder="Введіть повне ім'я"
                  placeholderTextColor={SemanticColors.placeholder.light}
                  autoComplete="name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoading}
                />
              </Input>
            )}
          />
          {errors.fullname && (
            <Text className="text-error-600 text-sm">{errors.fullname.message}</Text>
          )}
        </Box>

        <Box className="gap-2">
          <Text className="text-sm font-medium text-typography-700">
            Роль (необов'язково)
          </Text>
          <Controller
            control={control}
            name="role"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="bg-background-50 border border-outline-200 rounded-lg">
                <InputField
                  placeholder="USER, ADMIN, PRIME"
                  placeholderTextColor={SemanticColors.placeholder.light}
                  autoCapitalize="characters"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoading}
                />
              </Input>
            )}
          />
        </Box>

        <Box className="gap-2">
          <Text className="text-sm font-medium text-typography-700">
            Telegram (необов'язково)
          </Text>
          <Controller
            control={control}
            name="telegram"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="bg-background-50 border border-outline-200 rounded-lg">
                <InputField
                  placeholder="Введіть telegram"
                  placeholderTextColor={SemanticColors.placeholder.light}
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoading}
                />
              </Input>
            )}
          />
        </Box>

        <Box className="gap-2">
          <Text className="text-sm font-medium text-typography-700">
            URL фото (необов'язково)
          </Text>
          <Controller
            control={control}
            name="photo"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input className="bg-background-50 border border-outline-200 rounded-lg">
                <InputField
                  placeholder="https://example.com/photo.jpg"
                  placeholderTextColor={SemanticColors.placeholder.light}
                  autoCapitalize="none"
                  keyboardType="url"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isLoading}
                />
              </Input>
            )}
          />
          {errors.photo && (
            <Text className="text-error-600 text-sm">{errors.photo.message}</Text>
          )}
        </Box>

        <Button
          className="w-full"
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={SemanticColors.white} />
          ) : (
            <Text className="text-white font-semibold text-base">
              Зареєструватися
            </Text>
          )}
        </Button>
      </Box>
    </ScrollView>
  );
};

