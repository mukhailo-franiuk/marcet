'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// 1. Зміна статусу верифікації магазину (Допуск на платформу)
export async function toggleStoreVerification(sellerId: string, currentStatus: boolean, adminUserId: string) {
  try {
    await prisma.$transaction(async (tx) => {
      // Оновлюємо статус продавця
      const updatedSeller = await tx.sellerProfile.update({
        where: { id: sellerId },
        data: { isVerified: !currentStatus },
        include: { user: true }
      });

      // Знаходимо профіль адміна за його userId
      const adminProfile = await tx.adminProfile.findUnique({
        where: { userId: adminUserId }
      });

      if (!adminProfile) throw new Error("Профіль адміністратора не знайдено");

      // Записуємо дію в аудит-лог
      await tx.adminLog.create({
        data: {
          adminId: adminProfile.id,
          action: !currentStatus ? 'APPROVE_STORE' : 'REVOKE_STORE_APPROVAL',
          details: `Адмін змінив верифікацію магазину "${updatedSeller.storeName}" (ID користувача: ${updatedSeller.userId}) на ${!currentStatus}`,
        }
      });
    });

    revalidatePath('/admin/dashboard/sellers');
    return { success: "Статус верифікації успішно змінено!" };
  } catch (error: any) {
    console.error("Помилка адміна:", error);
    return { error: error.message || "Не вдалося змінити статус продавця." };
  }
}

// 2. Блокування / Розблокування всього аккаунту продавця
export async function toggleUserStatus(targetUserId: string, currentActiveStatus: boolean, adminUserId: string) {
  try {
    await prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id: targetUserId },
        data: { isActive: !currentActiveStatus }
      });

      const adminProfile = await tx.adminProfile.findUnique({
        where: { userId: adminUserId }
      });

      if (!adminProfile) throw new Error("Профіль адміністратора не знайдено");

      await tx.adminLog.create({
        data: {
          adminId: adminProfile.id,
          action: !currentActiveStatus ? 'UNBAN_USER' : 'BAN_USER',
          details: `Адмін змінив статус активності користувача ${updatedUser.email} на ${!currentActiveStatus}`,
        }
      });
    });

    revalidatePath('/admin');
    return { success: "Статус активності користувача змінено!" };
  } catch (error: any) {
    return { error: "Не вдалося виконати операцію над користувачем." };
  }
}
