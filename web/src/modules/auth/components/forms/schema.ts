import { RoleType } from "@/constants/roles";
import { z } from "zod";

/** Схема для створення користувача (PRIME) */
export const createUserSchema = z.object({
  username: z.string().min(3, "Логін повинен містити мінімум 3 символи"),
  password: z.string().min(6, "Пароль повинен містити мінімум 6 символів"),
  fullname: z.string().min(2, "Повне ім'я повинно містити мінімум 2 символи"),
  role: z.union([z.nativeEnum(RoleType), z.literal("")]).optional(),
  telegram: z.string().optional(),
  photo: z
    .string()
    .url("Введіть коректну URL адресу")
    .optional()
    .or(z.literal("")),
});

/** Схема для редагування користувача (PRIME), усі поля опційні */
export const editUserSchema = z
  .object({
    username: z
      .string()
      .min(3, "Логін повинен містити мінімум 3 символи")
      .optional(),
    password: z
      .string()
      .min(6, "Пароль повинен містити мінімум 6 символів")
      .optional()
      .or(z.literal("")),
    fullname: z.string().min(2, "Повне ім'я мінімум 2 символи").optional(),
    role: z.union([z.nativeEnum(RoleType), z.literal("")]).optional(),
    telegram: z.string().optional(),
    photo: z
      .string()
      .url("Введіть коректну URL адресу")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      const filled = Object.entries(data).filter(
        ([_, v]) => v !== undefined && v !== "",
      );
      return filled.length > 0;
    },
    { message: "Вкажіть хоча б одне поле для оновлення" },
  );

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type EditUserFormValues = z.infer<typeof editUserSchema>;

export const createUserDefaultValues: CreateUserFormValues = {
  username: "",
  password: "",
  fullname: "",
  role: "",
  telegram: "",
  photo: "",
};

export const editUserDefaultValues: EditUserFormValues = {
  username: "",
  password: "",
  fullname: "",
  role: "",
  telegram: "",
  photo: "",
};
