'use server';

import { prisma } from '@/lib/prisma';
import { RegisterSchema, RegisterInput } from '@/lib/validations/auth';
import bcrypt from 'bcryptjs';

export async function registerUser(values: RegisterInput) {
  // 1. Валідація даних на сервері
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Некоректні дані. Перевірте введені поля." };
  }

  const { email, password, name, role, storeName, phone } = validatedFields.data;

  try {
    // 2. Перевірка, чи існує користувач
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Користувач з таким email вже зареєстрований." };
    }

    // 3. Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Виконання транзакції в базі даних Neon
    await prisma.$transaction(async (tx) => {
      // Створюємо базового користувача
      const user = await tx.user.create({
        data: {
          email,
          name,
          passwordHash: hashedPassword,
          role: role as any, // приведення до Enum ролі
        },
      });

      // Якщо користувач реєструється як Продавець, створюємо для нього профіль магазину
      if (role === 'SELLER' && storeName && phone) {
        // Генеруємо простіший slug для URL магазину
        const storeSlug = storeName
          .toLowerCase()
          .replace(/[^a-z0-9а-яєіїґ]/g, '-')
          .replace(/-+/g, '-');

        // Перевіряємо унікальність назви магазину
        const existingStore = await tx.sellerProfile.findFirst({
          where: {
            OR: [{ storeName }, { storeSlug }],
          },
        });

        if (existingStore) {
          throw new Error("Назва магазину вже зайнята.");
        }

        await tx.sellerProfile.create({
          data: {
            userId: user.id,
            storeName,
            storeSlug,
            phone,
            isVerified: false, // Очікує модерації адміном
          },
        });
      }
    });

    return { success: "Реєстрація успішна! Тепер ви можете увійти." };

  } catch (error: any) {
    console.error("Реєстрація помилка:", error);
    return { error: error.message || "Щось пішло не так під час реєстрації. Спробуйте пізніше." };
  }
}
