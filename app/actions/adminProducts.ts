'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { put } from '@vercel/blob'; // 🔥 Імпортуємо офіційний завантажувач Vercel

// 1. Створення нового товару адміністратором (із завантаженням у Vercel Blob)
export async function createAdminProduct(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const oldPriceRaw = formData.get('oldPrice') as string;
    const categoryId = formData.get('categoryId') as string;
    const totalCount = parseInt(formData.get('totalCount') as string);
    const isHot = formData.get('isHot') === 'true';
    
    // Отримуємо файл з форми
    const imageFile = formData.get('image') as File;

    if (!title || !description || isNaN(price) || !imageFile || !categoryId || isNaN(totalCount)) {
      return { error: "Будь ласка, заповніть усі обов'язкові поля." };
    }

    // 1. 🔥 ЗАВАНТАЖЕННЯ НА ХМАРУ VERCEL BLOB
    const blob = await put(imageFile.name, imageFile, {
      access: 'public',
    });

    // Отримуємо чистий URL-рядок
    const imageUrl = blob.url;

    // 2. Організація профілю мерчанта
    let officialSeller = await prisma.sellerProfile.findFirst({
      where: { storeSlug: 'mercora-official' }
    });

    if (!officialSeller) {
      const adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
      if (!adminUser) throw new Error("Акаунт адміністратора не знайдено.");

      officialSeller = await prisma.sellerProfile.create({
        data: {
          userId: adminUser.id,
          storeName: 'Mercora Official',
          storeSlug: 'mercora-official',
          phone: '+380000000000',
          isVerified: true
        }
      });
    }

    // Авто-розрахунок знижки
    let discount: number | null = null;
    const oldPrice = oldPriceRaw ? parseFloat(oldPriceRaw) : undefined;
    if (oldPrice && oldPrice > price) {
      discount = Math.round(((oldPrice - price) / oldPrice) * 100);
    }

    // 3. ЗАПИС У БАЗУ НЕОН (Зберігаємо чистий URL рядком)
    await prisma.product.create({
      data: {
        title,
        description,
        image: imageUrl,         // 🔥 Записуємо посилання на Vercel Blob
        images: [imageUrl],      // Масив посилань
        price,
        oldPrice: oldPrice || null,
        discount,
        isHot,
        soldCount: 0,
        totalCount,
        isApproved: true,
        sellerId: officialSeller.id,
        categoryId,
      }
    });

    revalidatePath('/admin/products');
    revalidatePath('/');
    return { success: "Товар успішно додано, а картинку завантажено на хмару!" };

  } catch (error: any) {
    console.error("Помилка створення товару:", error);
    return { error: error.message || "Не вдалося завантажити файл на Vercel Blob." };
  }
}

// 2. 🔥 ДОДАНО: Зміна статусу модерації товарів (для ProductModerationRow)
export async function toggleProductApproval(productId: string, currentStatus: boolean) {
  try {
    await prisma.product.update({
      where: { id: productId },
      data: { isApproved: !currentStatus }
    });

    // Ревалідація кешу для миттєвого оновлення адмінки та вітрини маркетплейсу
    revalidatePath('/admin/products');
    revalidatePath('/');
    return { success: "Статус модерації товару оновлено!" };
  } catch (error) {
    console.error("Помилка модерації товару:", error);
    return { error: "Не вдалося змінити статус модерації." };
  }
}


