'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, Eye, ArrowUpRight } from 'lucide-react';

// Фейкові дані категорій та товарів
const categories = ['Усі', 'Електроніка', 'Мода', 'Для дому', 'Краса'];

const popularProducts = [
  {
    id: 101,
    title: 'Смартфон Mercora Phone Ultra 5G 12/256GB',
    image: 'https://unsplash.com',
    category: 'Електроніка',
    rating: 5.0,
    reviews: 412,
    price: 24999,
    badge: 'Топ продажів',
    badgeColor: 'bg-emerald-500',
  },
  {
    id: 102,
    title: 'Шкіряна куртка міська куртка Bomber Jacket Black',
    image: 'https://unsplash.com',
    category: 'Мода',
    rating: 4.9,
    reviews: 188,
    price: 3200,
    badge: 'Тренди',
    badgeColor: 'bg-violet-600',
  },
  {
    id: 103,
    title: 'Кавомашина автоматична Espresso Pro 15 Bar',
    image: 'https://unsplash.com',
    category: 'Для дому',
    rating: 4.8,
    reviews: 95,
    price: 11450,
    badge: 'Рекомендуємо',
    badgeColor: 'bg-blue-500',
  },
  {
    id: 104,
    title: 'Набір органічної косметики для догляду за обличчям Glow Skin',
    image: 'https://unsplash.com',
    category: 'Краса',
    rating: 4.9,
    reviews: 230,
    price: 1499,
    badge: 'Хіт',
    badgeColor: 'bg-rose-500',
  },
  {
    id: 105,
    title: 'Бездротова акустика StormSound Wave 2',
    image: 'https://unsplash.com',
    category: 'Електроніка',
    rating: 4.7,
    reviews: 74,
    price: 2199,
    badge: '',
    badgeColor: '',
  },
  {
    id: 106,
    title: 'Сонцезахисні окуляри багатокутні Retro Aviator',
    image: 'https://unsplash.com',
    category: 'Мода',
    rating: 4.8,
    reviews: 112,
    price: 850,
    badge: '',
    badgeColor: '',
  },
];

export default function PopularProducts() {
  const [activeTab, setActiveTab] = useState('Усі');

  // Фільтрація товарів на основі активного Табу
  const filteredProducts = activeTab === 'Усі' 
    ? popularProducts 
    : popularProducts.filter(p => p.category === activeTab);

  return (
    <section className="w-full bg-slate-50/50 py-12 md:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Верхня панель: Заголовок + Навігація вкладками (Tabs) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-gray-200/60 pb-6 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">Популярні товари</h2>
            <p className="text-xs text-gray-400 mt-0.5">Найбільш затребувані позиції за відгуками покупців</p>
          </div>

          {/* Вкладки (Таби) категорій */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-gray-200/80 shadow-sm overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activeTab === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-gray-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Сітка товарів */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group relative bg-white border border-gray-100 rounded-2xl p-4 flex flex-col hover:shadow-xl hover:border-transparent transition-all duration-300"
            >
              {/* Бейдж популярності (якщо є) */}
              {product.badge && (
                <span className={`absolute top-4 left-4 z-10 text-white font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm ${product.badgeColor}`}>
                  {product.badge}
                </span>
              )}

              {/* Швидкі кнопки дії при ховері */}
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button type="button" aria-label="Додати в обране" className="w-8 h-8 bg-white border border-gray-100 text-gray-600 hover:text-red-500 hover:border-red-100 rounded-full flex items-center justify-center shadow-md transition-colors">
                  <Heart size={16} />
                </button>
                <button type="button" aria-label="Швидкий перегляд" className="w-8 h-8 bg-white border border-gray-100 text-gray-600 hover:text-violet-600 hover:border-violet-100 rounded-full flex items-center justify-center shadow-md transition-colors">
                  <Eye size={16} />
                </button>
              </div>

              {/* Зображення */}
              <Link href={`/product/${product.id}`} className="block aspect-square w-full rounded-xl overflow-hidden bg-gray-50 relative mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* Категорія товару */}
              <span className="text-[11px] font-semibold text-violet-600 uppercase tracking-wider">
                {product.category}
              </span>

              {/* Назва товару */}
              <Link href={`/product/${product.id}`} className="mt-1 flex-1">
                <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 hover:text-violet-600 transition-colors leading-snug">
                  {product.title}
                </h3>
              </Link>

              {/* Блок рейтингу зі зіркою */}
              <div className="flex items-center gap-1 mt-2 mb-4">
                <div className="flex text-amber-400">
                  <Star size={14} className="fill-current" />
                </div>
                <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                <span className="text-slate-300 text-xs">|</span>
                <span className="text-[11px] text-gray-400">{product.reviews} замовлень</span>
              </div>

              {/* Нижня частина: Ціна + Кошик */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <span className="text-lg font-black text-slate-900 leading-tight">
                  {product.price.toLocaleString('uk-UA')} <span className="text-sm font-bold">₴</span>
                </span>
                
                <button 
                  type="button"
                  className="w-10 h-10 bg-slate-900 hover:bg-violet-600 text-white rounded-xl flex items-center justify-center transition-all shadow-md shadow-slate-100 shrink-0"
                  aria-label="Додати в кошик"
                >
                  <ShoppingCart size={18} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Нижня кнопка "Дивитись усі" */}
        <div className="flex justify-center mt-10">
          <Link 
            href="/catalog?sort=popular" 
            className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3 rounded-xl shadow-sm text-sm transition-all group"
          >
            Дивитись усі популярні
            <ArrowUpRight size={16} className="text-gray-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
