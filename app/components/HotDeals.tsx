import React from 'react';
import Link from 'next/link';
import { Flame, Star, ShoppingCart, Heart, Eye } from 'lucide-react';

// Фейкові дані для акційних товарів
const hotProducts = [
  {
    id: 1,
    title: 'Бездротові навушники Pro Sound X-200 Black',
    image: 'https://unsplash.com',
    category: 'Електроніка',
    rating: 4.9,
    reviews: 124,
    oldPrice: 3499,
    currentPrice: 1999,
    discount: 43,
    soldCount: 84,
    totalCount: 100,
  },
  {
    id: 2,
    title: 'Розумний годинник Active Watch 5 з AMOLED екраном',
    image: 'https://unsplash.com',
    category: 'Електроніка',
    rating: 4.7,
    reviews: 89,
    oldPrice: 5999,
    currentPrice: 3899,
    discount: 35,
    soldCount: 42,
    totalCount: 50,
  },
  {
    id: 3,
    title: 'Рюкзак міський водонепроникний Urban Shield',
    image: 'https://unsplash.com',
    category: 'Мода',
    rating: 4.8,
    reviews: 56,
    oldPrice: 1850,
    currentPrice: 999,
    discount: 46,
    soldCount: 19,
    totalCount: 20,
  },
  {
    id: 4,
    title: 'Зволожувач повітря ультразвуковий AirFresh H4',
    image: 'https://unsplash.com',
    category: 'Для дому',
    rating: 4.6,
    reviews: 37,
    oldPrice: 2100,
    currentPrice: 1450,
    discount: 31,
    soldCount: 12,
    totalCount: 40,
  },
];

export default function HotDeals() {
  return (
    <section className="w-full bg-white py-12 md:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Шапка блоку: Заголовок + Таймер */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
              <Flame size={22} className="fill-current" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">Гарячі пропозиції</h2>
              <p className="text-xs text-gray-400 mt-0.5">Встигніть купити за суперціною — пропозиція обмежена</p>
            </div>
          </div>

          {/* Таймер акції */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-2 hidden md:inline">До кінця акції:</span>
            <div className="flex gap-1.5 text-slate-900 font-bold text-sm">
              <div className="bg-slate-100 px-2.5 py-1.5 rounded-lg min-w-[36px] text-center">02<span className="text-[10px] text-gray-400 block font-medium leading-none mt-0.5">дн</span></div>
              <div className="bg-slate-100 px-2.5 py-1.5 rounded-lg min-w-[36px] text-center">14<span className="text-[10px] text-gray-400 block font-medium leading-none mt-0.5">год</span></div>
              <div className="bg-slate-100 px-2.5 py-1.5 rounded-lg min-w-[36px] text-center">45<span className="text-[10px] text-gray-400 block font-medium leading-none mt-0.5">хв</span></div>
              <div className="bg-slate-100 px-2.5 py-1.5 rounded-lg min-w-[36px] text-center">23<span className="text-[10px] text-gray-400 block font-medium leading-none mt-0.5">сек</span></div>
            </div>
          </div>
        </div>

        {/* Сітка товарів */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {hotProducts.map((product) => {
            const soldPercentage = Math.round((product.soldCount / product.totalCount) * 100);
            
            return (
              <div 
                key={product.id} 
                className="group relative bg-white border border-gray-100 rounded-2xl p-4 flex flex-col hover:shadow-xl hover:border-transparent transition-all duration-300"
              >
                {/* Анімований бейдж знижки */}
                <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-500 to-red-500 text-white font-bold text-xs px-2.5 py-1 rounded-full shadow-sm">
                  -{product.discount}%
                </span>

                {/* Швидкі дії при ховері */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button type="button" aria-label="Додати в обране" className="w-8 h-8 bg-white border border-gray-100 text-gray-600 hover:text-red-500 hover:border-red-100 rounded-full flex items-center justify-center shadow-md transition-colors">
                    <Heart size={16} />
                  </button>
                  <button type="button" aria-label="Швидкий перегляд" className="w-8 h-8 bg-white border border-gray-100 text-gray-600 hover:text-violet-600 hover:border-violet-100 rounded-full flex items-center justify-center shadow-md transition-colors">
                    <Eye size={16} />
                  </button>
                </div>

                {/* Зображення товару */}
                <Link href={`/product/${product.id}`} className="block aspect-square w-full rounded-xl overflow-hidden bg-gray-50 relative mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Категорія */}
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  {product.category}
                </span>

                {/* Назва товару */}
                <Link href={`/product/${product.id}`} className="mt-1 flex-1">
                  <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 hover:text-violet-600 transition-colors leading-snug">
                    {product.title}
                  </h3>
                </Link>

                {/* Рейтинг */}
                <div className="flex items-center gap-1 mt-2 mb-3">
                  <div className="flex text-amber-400">
                    <Star size={14} className="fill-current" />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                  <span className="text-[11px] text-gray-400">({product.reviews} відгуків)</span>
                </div>

                {/* Блок прогресу FOMO (Скільки куплено) */}
                <div className="w-full space-y-1 mb-4">
                  <div className="flex justify-between text-[11px] font-medium text-gray-500">
                    <span>Куплено: <b>{product.soldCount}</b></span>
                    <span>Залишилось: <b>{product.totalCount - product.soldCount}</b></span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full transition-all duration-500"
                      style={{ width: `${soldPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Ціни та кнопка купити */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 line-through leading-none">
                      {product.oldPrice.toLocaleString('uk-UA')} ₴
                    </span>
                    <span className="text-lg font-black text-slate-900 leading-tight mt-0.5">
                      {product.currentPrice.toLocaleString('uk-UA')} <span className="text-sm font-bold">₴</span>
                    </span>
                  </div>
                  
                  <button 
                    type="button"
                    className="w-10 h-10 bg-violet-600 hover:bg-violet-700 text-white rounded-xl flex items-center justify-center transition-colors shadow-md shadow-violet-100 hover:shadow-violet-200 shrink-0"
                    aria-label="Додати в кошик"
                  >
                    <ShoppingCart size={18} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
