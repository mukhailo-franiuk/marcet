'use client';

import React, { useTransition } from 'react';
import { toggleProductApproval } from '@/app/actions/adminProducts';
import { Check, EyeOff, RefreshCw } from 'lucide-react';

interface ProductModerationRowProps {
  product: {
    id: string;
    title: string;
    price: number;
    totalCount: number;
    isHot: boolean;
    isApproved: boolean;
    image: string; // Тепер це чистий URL-рядок від Vercel Blob
    category: {
      name: string;
    };
    seller: {
      storeName: string;
    };
  };
}

export default function ProductModerationRow({ product }: ProductModerationRowProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggleApproval = () => {
    startTransition(async () => {
      const res = await toggleProductApproval(product.id, product.isApproved);
      if (res?.error) {
        alert(res.error);
      }
    });
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-slate-50/50 transition-colors text-sm text-slate-700">
      {/* Інформація про товар та категорію */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-10 h-10 object-cover rounded-lg bg-gray-50 border shrink-0" 
            loading="lazy"
          />
          <div className="flex flex-col max-w-[220px]">
            <span className="font-bold text-slate-900 truncate" title={product.title}>
              {product.title}
            </span>
            <span className="text-[11px] text-violet-600 font-semibold uppercase tracking-wider">
              {product.category.name}
            </span>
          </div>
        </div>
      </td>

      {/* Продавець / Магазин */}
      <td className="px-6 py-4 font-medium text-gray-500">
        {product.seller.storeName}
      </td>

      {/* Поточна ціна */}
      <td className="px-6 py-4 font-black text-slate-900">
        {product.price.toLocaleString('uk-UA')} ₴
      </td>

      {/* Кількість на складі */}
      <td className="px-6 py-4 text-center font-medium">
        {product.totalCount} шт
      </td>

      {/* Промо-статус (Акція) */}
      <td className="px-6 py-4 text-center">
        {product.isHot ? (
          <span className="bg-amber-50 text-amber-700 font-bold text-[10px] px-2 py-0.5 rounded-md border border-amber-100 uppercase tracking-wide">
            Hot 🔥
          </span>
        ) : (
          <span className="text-gray-300 text-xs">—</span>
        )}
      </td>

      {/* Статус модерації */}
      <td className="px-6 py-4">
        {product.isApproved ? (
          <span className="text-emerald-500 font-semibold text-xs">
            Активний в каталозі
          </span>
        ) : (
          <span className="text-amber-500 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
            Очікує перевірки
          </span>
        )}
      </td>

      {/* Кнопки дій модератора */}
      <td className="px-6 py-4 text-right">
        <button
          type="button"
          disabled={isPending}
          onClick={handleToggleApproval}
          className={`p-2 rounded-xl border transition-all ${
            product.isApproved 
              ? 'bg-white hover:bg-rose-50 text-rose-600 border-gray-200 hover:border-rose-200' 
              : 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent shadow-sm'
          } disabled:opacity-50`}
          title={product.isApproved ? "Приховати з сайту" : "Схвалити та опублікувати"}
        >
          {isPending ? (
            <RefreshCw size={14} className="animate-spin" />
          ) : product.isApproved ? (
            <EyeOff size={14} />
          ) : (
            <Check size={14} />
          )}
        </button>
      </td>
    </tr>
  );
}
