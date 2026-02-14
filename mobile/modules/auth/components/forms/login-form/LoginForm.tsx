import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { LoginFormView } from "@/modules/auth/components/forms/login-form/LoginFormView";
import {
  loginFormDefaultValues,
  loginSchema,
  type LoginFormValues,
} from "@/modules/auth/components/forms/login-form/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: loginFormDefaultValues,
  });
  const { setError } = form;

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
    <LoginFormView
      form={form}
      showPassword={showPassword}
      onTogglePassword={() => setShowPassword((prev) => !prev)}
      isLoading={isLoading}
      error={error}
      onSubmit={onSubmit}
    />
  );
};
