import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "../hooks/useAuth";

// Zod schema for register form
const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullname: z.string().min(2, "Full name must be at least 2 characters"),
  role: z.string().optional(),
  telegram: z.string().optional(),
  photo: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const { register: registerUser, isLoading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setFocus,
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

  React.useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("root", { message: err.message });
      } else {
        setError("root", { message: "An unknown error occurred" });
      }
    }
  };

  return (
    <Card className="mx-auto mt-10 max-w-sm p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <h2 className="text-xl font-semibold">Register</h2>
        <Separator />
        {errors.root && (
          <Alert variant="destructive">{errors.root.message}</Alert>
        )}
        {error && <Alert variant="destructive">{error}</Alert>}

        <Input
          type="text"
          placeholder="Username"
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
          placeholder="Password"
          autoComplete="new-password"
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

        <Input
          type="text"
          placeholder="Full Name"
          autoComplete="name"
          aria-invalid={!!errors.fullname}
          aria-describedby="fullname-error"
          {...register("fullname")}
          disabled={isLoading}
        />
        {errors.fullname && (
          <span id="fullname-error" className="block text-sm text-red-600">
            {errors.fullname.message}
          </span>
        )}

        <Input
          type="text"
          placeholder="Role (optional)"
          {...register("role")}
          disabled={isLoading}
        />

        <Input
          type="text"
          placeholder="Telegram (optional)"
          {...register("telegram")}
          disabled={isLoading}
        />

        <Input
          type="url"
          placeholder="Photo URL (optional)"
          {...register("photo")}
          disabled={isLoading}
        />
        {errors.photo && (
          <span className="block text-sm text-red-600">
            {errors.photo.message}
          </span>
        )}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>
    </Card>
  );
};
