import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Логін мінімум три букви"),
  password: z.string().min(3, "Пароль мінімум три букви"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const loginFormDefaultValues: LoginFormValues = {
  username: "",
  password: "",
};
