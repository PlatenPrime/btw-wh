import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Авторизація</h2>
        <p className="text-sm text-muted-foreground">
          Увійдіть до свого облікового запису
        </p>
      </div>
      <Separator />
      <div className="flex flex-col gap-4">
        {errors.root && (
          <Alert variant="destructive">{errors.root.message}</Alert>
        )}
        {error && <Alert variant="destructive">{error}</Alert>}
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            placeholder="Логін"
            autoComplete="username"
            aria-invalid={!!errors.username}
            aria-describedby="username-error"
            {...register("username")}
            disabled={isLoading}
            className="h-11"
          />
          {errors.username && (
            <span id="username-error" className="block text-sm text-destructive">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
              {...register("password")}
              disabled={isLoading}
              className="h-11 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
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
            <span id="password-error" className="block text-sm text-destructive">
              {errors.password.message}
            </span>
          )}
        </div>
        <Button type="submit" disabled={isLoading} className="h-11 w-full" size="lg">
          {isLoading ? "Виконую вхід..." : "Вхід"}
        </Button>
      </div>
    </form>
  );
};
