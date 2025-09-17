import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useAuth } from "@/modules/auth/api/hooks/useAuth.ts";

// Zod schema for login form
const loginSchema = z.object({
  username: z.string().min(3, "Логін мінімум три букви"),
  password: z.string().min(3, "Пароль мінімум три букви"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { username: "", password: "" },
  });

  React.useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.username, data.password);
      navigate("/", { replace: true });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("root", { message: err.message });
      } else {
        setError("root", { message: "Сталася невідома помилка" });
      }
    }
  };

  return (
    <Card className="mx-auto max-w-sm p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <h2 className="text-center text-xl font-semibold">Авторизація</h2>
        <Separator />
        {errors.root && (
          <Alert variant="destructive">{errors.root.message}</Alert>
        )}
        {error && <Alert variant="destructive">{error}</Alert>}
        <Input
          type="text"
          placeholder="Логін"
          autoComplete="username"
          aria-invalid={!!errors.username}
          aria-describedby="username-error"
          {...register("username")}
          disabled={isLoading}
        />
        {errors.username && (
          <span id="username-error" className="block text-sm text-red-600">
            {errors.username.message}
          </span>
        )}
        <Input
          type="password"
          placeholder="Пароль"
          autoComplete="current-password"
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
          {...register("password")}
          disabled={isLoading}
        />
        {errors.password && (
          <span id="password-error" className="block text-sm text-red-600">
            {errors.password.message}
          </span>
        )}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Виконую вхід..." : "Вхід"}
        </Button>
      </form>
    </Card>
  );
};
