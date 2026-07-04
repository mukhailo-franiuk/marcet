import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(2, { message: "Ім'я повинно містити мінімум 2 символи" }),
  email: z.string().email({ message: "Введіть коректну електронну адресу" }),
  password: z
    .string()
    .min(8, { message: "Пароль має бути не менше 8 символів" })
    .regex(/[A-ZА-ЯЄІЇҐ]/, { message: "Пароль повинен містити хоча б одну велику літеру" }) // Підтримка латиниці та кирилиці (Укр)
    .regex(/[a-zа-яєіїґ]/, { message: "Пароль повинен містити хоча б одну малу літеру" })  // Підтримка латиниці та кирилиці (Укр)
    .regex(/[0-9]/, { message: "Пароль повинен містити хоча б одну цифру" }),
  confirmPassword: z.string(),
  role: z.enum(['CUSTOMER', 'SELLER'], {
    message: "Будь ласка, оберіть тип аккаунта",
  }),
  // Додаткові поля, якщо обрано роль продавця
  storeName: z.string().optional(),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Паролі не збігаються",
  path: ["confirmPassword"],
}).refine((data) => {
  if (data.role === 'SELLER' && (!data.storeName || data.storeName.trim() === '')) {
    return false;
  }
  return true;
}, {
  message: "Для продавця назва магазину є обов'язаковою",
  path: ["storeName"],
}).refine((data) => {
  if (data.role === 'SELLER' && (!data.phone || data.phone.trim() === '')) {
    return false;
  }
  return true;
}, {
  message: "Для продавця номер телефону є обов'язаковим",
  path: ["phone"],
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

