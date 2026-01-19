import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/modules/auth/api/hooks/useAuth.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

// Zod schema for login form
const loginSchema = z.object({
  username: z.string().min(3, "Логін мінімум три букви"),
  password: z.string().min(3, "Пароль мінімум три букви"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
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
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Пароль"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            aria-describedby="password-error"
            {...register("password")}
            disabled={isLoading}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            {showPassword ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
        </div>
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
