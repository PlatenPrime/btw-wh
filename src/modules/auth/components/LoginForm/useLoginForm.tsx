import { useAuthStore } from "@/modules/auth/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(1, "Логін обовязковий"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

export type LoginFormData = z.infer<typeof formSchema>;

export const useLoginForm = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  async function onSubmit(values: LoginFormData) {
    try {
      await login(values);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return { form, onSubmit };
};
