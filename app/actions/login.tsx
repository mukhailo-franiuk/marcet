'use server';

import { prisma } from '@/lib/prisma';
import { LoginSchema, LoginInput } from '@/lib/validations/login';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function loginUser(values: LoginInput) {
  // 1. Серверна валідація полів
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Некоректна адреса або пароль." };
  }

  const { email, password } = validatedFields.data;

  try {
    // 2. Пошук користувача в базі даних Neon
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Якщо користувача немає або у нього немає паролю
    if (!user || !user.passwordHash) {
      return { error: "Неправильний email або пароль." };
    }

    // 3. Перевірка активності аккаунта (чи не забанений адміном)
    if (!user.isActive) {
      return { error: "Ваш аккаунт заблоковано адміністрацією платформи." };
    }

    // 4. Порівняння паролів
    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordsMatch) {
      return { error: "Неправильний email або пароль." };
    }

    // 5. Встановлення захищених кук для Middleware та Хедера (Next.js 15+ вимагає await cookies())
    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === 'production';

    // Записуємо токен сесії
    cookieStore.set('auth_token', user.id, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 днів
      path: '/',
    });

    // Записуємо роль, яку зчитає Middleware для обмеження доступу
    cookieStore.set('user_role', user.role, {
      httpOnly: true, // Повний захист від крадіжки токена через клієнтські скрипти (XSS)
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    // 🔥 НОВИЙ БЛОК: Записуємо аватарку користувача з бази даних
    cookieStore.set('user_image', user.image || '', {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    // 6. Повертаємо успіх та роль користувача для розумного редіректу на клієнті
    return { 
      success: "Авторизація успішна!", 
      role: user.role // CUSTOMER, SELLER або ADMIN
    };

  } catch (error) {
    console.error("Помилка авторизації:", error);
    return { error: "Сталася внутрішня помилка сервера. Спробуйте пізніше." };
  }
}


