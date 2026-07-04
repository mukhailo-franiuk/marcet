'use client';

import React, { useTransition } from 'react';
import { updateOrderStatus } from '@/app/actions/adminOrders';
import { RefreshCw, Package, Truck, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface OrderRowProps {
  order: {
    id: string;
    status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    totalAmount: number;
    shippingAddress: string;
    phone: string;
    customerName: string;
    createdAt: Date;
    customer: {
      email: string;
    };
    _count: {
      items: number;
    };
  };
  adminUserId: string;
}

export default function OrderModerationRow({ order, adminUserId }: OrderRowProps) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as any;
    
    startTransition(async () => {
      const res = await updateOrderStatus(order.id, newStatus, adminUserId);
      if (res?.error) alert(res.error);
    });
  };

  // Колірні стилі для бейджів статусів
  const statusStyles = {
    PENDING: 'bg-amber-50 text-amber-700 border-amber-100',
    PAID: 'bg-blue-50 text-blue-700 border-blue-100',
    SHIPPED: 'bg-violet-50 text-violet-700 border-violet-100',
    DELIVERED: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    CANCELLED: 'bg-rose-50 text-rose-700 border-rose-100',
  };

  const statusIcons = {
    PENDING: <AlertCircle size={14} />,
    PAID: <Package size={14} />,
    SHIPPED: <Truck size={14} />,
    DELIVERED: <CheckCircle2 size={14} />,
    CANCELLED: <XCircle size={14} />,
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-slate-50/50 transition-colors text-sm text-slate-700">
      {/* ID замовлення та дата */}
      <td className="px-6 py-4 font-mono text-xs">
        <div className="flex flex-col">
          <span className="font-bold text-slate-900">#{order.id.slice(-8).toUpperCase()}</span>
          <span className="text-[10px] text-gray-400 mt-0.5">
            {new Date(order.createdAt).toLocaleDateString('uk-UA')}
          </span>
        </div>
      </td>

      {/* Покупець та Контакти */}
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-semibold text-slate-800">{order.customerName}</span>
          <span className="text-xs text-gray-400 font-mono">{order.phone}</span>
        </div>
      </td>

      {/* Адреса доставки */}
      <td className="px-6 py-4 max-w-[200px] truncate" title={order.shippingAddress}>
        {order.shippingAddress}
      </td>

      {/* Кількість унікальних позицій */}
      <td className="px-6 py-4 text-center font-medium">
        {order._count.items} шт
      </td>

      {/* Сума чеку */}
      <td className="px-6 py-4 font-black text-slate-900">
        {order.totalAmount.toLocaleString('uk-UA')} ₴
      </td>

      {/* Поточний Статус */}
      <td className="px-6 py-4">
        <span className={`inline-flex items-center gap-1 border text-xs px-2.5 py-0.5 rounded-full font-bold ${statusStyles[order.status]}`}>
          {statusIcons[order.status]}
          {order.status === 'PENDING' && 'Очікує'}
          {order.status === 'PAID' && 'Оплачено'}
          {order.status === 'SHIPPED' && 'Доставка'}
          {order.status === 'DELIVERED' && 'Видано'}
          {order.status === 'CANCELLED' && 'Скасовано'}
        </span>
      </td>

      {/* Зміна статусу адміном */}
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          {isPending && <RefreshCw size={16} className="animate-spin text-violet-500 mr-2" />}
          
          <select
            value={order.status}
            disabled={isPending}
            onChange={handleStatusChange}
            className="text-xs font-semibold px-3 py-2 bg-slate-50 border rounded-xl focus:outline-none focus:border-violet-500 text-slate-800 disabled:opacity-50"
          >
            <option value="PENDING">Очікує оплати</option>
            <option value="PAID">Оплачено (Комплектація)</option>
            <option value="SHIPPED">Передано в доставку</option>
            <option value="DELIVERED">Отримано (Закрити у Tout)</option>
            <option value="CANCELLED">Скасувати замовлення</option>
          </select>
        </div>
      </td>
    </tr>
  );
}
