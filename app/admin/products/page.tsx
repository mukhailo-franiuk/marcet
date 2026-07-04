import React from 'react';
import { prisma } from '@/lib/prisma';
import AdminSidebar from '../componets/AdminSidebar';
import AddProductForm from './AddProductForm';
import ProductModerationRow from './ProductModerationRow';
import { ShoppingBag, ShieldAlert, CheckCircle, Flame } from 'lucide-react';

export const metadata = {
  title: 'Модерація та додавання товарів | Адмін-панель',
};

export default async function AdminProductsPage() {
  // Паралельно завантажуємо товари, категорії та лічильники з Neon DB
  const [products, categories, totalCount, pendingCount, hotCount] = await Promise.all([
    prisma.product.findMany({
      include: { category: true, seller: true },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.category.findMany({ select: { id: true, name: true } }),
    prisma.product.count(),
    prisma.product.count({ where: { isApproved: false } }),
    prisma.product.count({ where: { isHot: true } })
  ]);

  return (
    <div className="w-full min-h-screen bg-slate-50 flex font-sans">
      <AdminSidebar />

      <div className="flex-1 md:pl-64 flex flex-col min-h-screen pt-16 md:pt-0">
        <div className="p-4 md:p-8 space-y-6 md:space-y-8 flex-1">
          
          {/* Топ-бар секції: Заголовок + Кнопка додавання */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">Управління каталогом</h1>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Створення офіційних товарів та модерація карток від сторонніх продавців</p>
            </div>
            {/* Клієнтська висувна форма додавання */}
            <AddProductForm categories={categories} />
          </div>

          {/* Віджети аналітики товарів */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
            <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center shrink-0"><ShoppingBag size={22} /></div>
              <div><span className="block text-xl md:text-2xl font-black text-slate-950">{totalCount}</span><span className="text-xs text-gray-400 font-medium">Всього товарів</span></div>
            </div>
            <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0"><ShieldAlert size={22} /></div>
              <div><span className="block text-xl md:text-2xl font-black text-slate-950">{pendingCount}</span><span className="text-xs text-gray-400 font-medium">Потребують перевірки</span></div>
            </div>
            <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0"><Flame size={22} /></div>
              <div><span className="block text-xl md:text-2xl font-black text-slate-950">{hotCount}</span><span className="text-xs text-gray-400 font-medium">Гарячих пропозицій</span></div>
            </div>
          </div>

          {/* Таблиця реєстру та модерації товарів */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-slate-100/40 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="font-bold text-slate-900 text-base md:text-lg">Схвалення позицій каталогу</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 font-bold text-xs uppercase tracking-wider border-b border-gray-100">
                    <th className="px-6 py-4">Товар / Категорія</th>
                    <th className="px-6 py-4">Продавець</th>
                    <th className="px-6 py-4">Ціна</th>
                    <th className="px-6 py-4 text-center">Склад</th>
                    <th className="px-6 py-4 text-center">Промо</th>
                    <th className="px-6 py-4">Статус</th>
                    <th className="px-6 py-4 text-right">Дії</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">Каталог товарів наразі пустий.</td>
                    </tr>
                  ) : (
                    products.map((product) => (
                      <ProductModerationRow key={product.id} product={product} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
