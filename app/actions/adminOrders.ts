'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Зміна статусу замовлення адміністратором платформи
export async function updateOrderStatus(orderId: string, newStatus: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED', adminUserId: string) {
  try {
    await prisma.$transaction(async (tx) => {
      // 1. Оновлюємо статус самого замовлення
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { status: newStatus },
        include: { customer: true }
      });

      // 2. Якщо статус змінюється на DELIVERED (Отримано покупцем), 
      // ми розблоковуємо та зараховуємо гроші на баланси відповідних продавців
      if (newStatus === 'DELIVERED') {
        const orderItems = await tx.orderItem.findMany({
          where: { orderId: orderId },
          include: { product: true }
        });

        for (const item of orderItems) {
          // Розраховуємо суму для конкретного продавця (ціна позиції * кількість)
          const payoutAmount = item.price * item.quantity;

          await tx.sellerProfile.update({
            where: { id: item.product.sellerId },
            data: { balance: { increment: payoutAmount } }
          });
        }
      }

      // 3. Знаходимо профіль адміна для аудиту
      const adminProfile = await tx.adminProfile.findUnique({
        where: { userId: adminUserId }
      });

      if (!adminProfile) throw new Error("Профіль адміністратора не знайдено");

      // 4. Записуємо операцію в аудит-лог
      await tx.adminLog.create({
        data: {
          adminId: adminProfile.id,
          action: 'UPDATE_ORDER_STATUS',
          details: `Адмін змінив статус замовлення #${orderId} покупця ${updatedOrder.customer.email} на статус: ${newStatus}`,
        }
      });
    });

    // Миттєво оновлюємо кеш панелі адміна
    revalidatePath('/admin/orders');
    return { success: `Статус замовлення успішно змінено на ${newStatus}` };
  } catch (error: any) {
    console.error("Помилка оновлення замовлення:", error);
    return { error: error.message || "Не вдалося змінити статус замовлення." };
  }
}
