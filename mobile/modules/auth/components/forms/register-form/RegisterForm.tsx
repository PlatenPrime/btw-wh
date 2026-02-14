import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { RegisterData } from "@/modules/auth/api/types";
import { RegisterFormView } from "@/modules/auth/components/forms/register-form/RegisterFormView";
import {
  registerFormDefaultValues,
  registerSchema,
  type RegisterFormValues,
} from "@/modules/auth/components/forms/register-form/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const RegisterForm = () => {
  const { register: registerUser, isLoading, error } = useAuth();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: registerFormDefaultValues,
  });
  const { setError } = form;

  const onSubmit = async (data: RegisterFormValues) => {
    try {
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
    <RegisterFormView
      form={form}
      isLoading={isLoading}
      error={error}
      onSubmit={onSubmit}
    />
  );
};
