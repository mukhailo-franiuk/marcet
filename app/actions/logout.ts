'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logoutUser() {
  try {
    const cookieStore = await cookies();
    
    // 1. Видаляємо всі куки авторизації, сесії, ролі та зображення користувача
    cookieStore.delete('auth_token');
    cookieStore.delete('user_role');   // 🔥 Очищаємо роль для Middleware
    cookieStore.delete('user_image');  // 🔥 Очищаємо аватарку користувача для Хедера
    
    // Куки для сумісності з NextAuth / Auth.js
    cookieStore.delete('next-auth.session-token');
    cookieStore.delete('__Secure-next-auth.session-token');
    cookieStore.delete('next-auth.callback-url');
    
  } catch (error) {
    console.error('Помилка під час видалення кук:', error);
  }

  // 2. Перенаправляємо користувача на головну сторінку маркетплейсу
  redirect('/');
}

