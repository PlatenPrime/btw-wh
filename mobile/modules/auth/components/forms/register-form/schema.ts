import { RoleType } from "@/constants/roles";
import { z } from "zod";

export const registerSchema = z.object({
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

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const registerFormDefaultValues: RegisterFormValues = {
  username: "",
  password: "",
  fullname: "",
  role: "",
  telegram: "",
  photo: "",
};
