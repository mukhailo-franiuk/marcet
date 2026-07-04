import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: "Введіть коректну електронну адресу" }),
  password: z.string().min(1, { message: "Пароль є обов'язковим для входу" }),
});

export type LoginInput = z.infer<typeof LoginSchema>;
