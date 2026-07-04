'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Функція транслітерації українського тексту в латинський slug (вже є у вашому файлі)
function generateSlug(text: string): string {
  const ukrToLat: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g', 'д': 'd', 'е': 'e', 'є': 'ye',
    'ж': 'zh', 'з': 'z', 'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k', 'л': 'l',
    'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ь': '',
    'ю': 'yu', 'я': 'ya', ' ': '-', '_': '-'
  };

  return text
    .toLowerCase()
    .trim()
    .split('')
    .map(char => ukrToLat[char] !== undefined ? ukrToLat[char] : char)
    .join('')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Старий метод створення (залишається без змін)
export async function createCategory(name: string) {
  try {
    if (!name || name.trim().length < 2) return { error: "Мінімум 2 символи." };
    const cleanName = name.trim();
    const slug = generateSlug(cleanName);
    const existing = await prisma.category.findFirst({ where: { OR: [{ name: cleanName }, { slug }] } });
    if (existing) return { error: "Категорія або схожий URL-слаг вже існують." };
    await prisma.category.create({ data: { name: cleanName, slug } });
    revalidatePath('/admin/categories');
    return { success: `Категорію створено!` };
  } catch { return { error: "Помилка сервера." }; }
}

// 🔥 НОВИЙ ЕКШЕН: Редагування категорії
export async function updateCategory(id: string, newName: string) {
  try {
    if (!newName || newName.trim().length < 2) {
      return { error: "Назва має містити мінімум 2 символи." };
    }

    const cleanName = newName.trim();
    const slug = generateSlug(cleanName);

    // Перевіряємо, чи немає іншої категорії з такою ж назвою або слагом
    const duplicate = await prisma.category.findFirst({
      where: {
        id: { not: id },
        OR: [{ name: cleanName }, { slug: slug }]
      }
    });

    if (duplicate) {
      return { error: "Інша категорія вже використовує таку назву або URL-слаг." };
    }

    await prisma.category.update({
      where: { id },
      data: { name: cleanName, slug: slug }
    });

    revalidatePath('/admin/categories');
    revalidatePath('/admin/products');
    return { success: "Категорію успішно оновлено!" };
  } catch (error) {
    return { error: "Не вдалося оновити категорію." };
  }
}

// 🔥 НОВИЙ ЕКШЕН: Видалення категорії
export async function deleteCategory(id: string) {
  try {
    // Перевіряємо, чи є товари в цій категорії (onDelete: Cascade у схемі видалить їх, але для безпеки краще попередити)
    const productsCount = await prisma.product.count({ where: { categoryId: id } });

    await prisma.category.delete({
      where: { id }
    });

    revalidatePath('/admin/categories');
    revalidatePath('/admin/products');
    return { success: `Категорію видалено разом із її товарами (${productsCount} шт.)!` };
  } catch (error) {
    return { error: "Не вдалося видалити категорію." };
  }
}

