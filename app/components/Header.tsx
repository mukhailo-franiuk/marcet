import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import MobileMenuTrigger from './MobileMenuTrigger'; // Створимо на Кроці 4
import { Search, User, Heart, ShoppingCart, Laptop, Shirt, Home, HeartPulse, Trophy, Car, Percent } from 'lucide-react';

export default async function Header() {
  const cookieStore = await cookies();
  
  // Зчитуємо дані авторизації з кук
  const isAuthenticated = !!cookieStore.get('auth_token')?.value;
  const userRole = cookieStore.get('user_role')?.value;
  const userImage = cookieStore.get('user_image')?.value;

  // Визначаємо динамічний лінк на кабінет та текст кнопки залежно від ролі
  let profileLink = '/profile';
  let profileText = 'Увійти';
  let profileSubtext = 'Мій кабінет';

  if (isAuthenticated) {
    profileText = 'Кабінет';
    if (userRole === 'ADMIN') {
      profileLink = '/admin';
      profileSubtext = 'Панель адміна';
    } else if (userRole === 'SELLER') {
      profileLink = '/seller/dashboard';
      profileSubtext = 'Мій магазин';
    } else {
      profileLink = '/profile';
      profileSubtext = 'Покупець';
    }
  }

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 font-sans sticky top-0 z-40">
      {/* Верхня панель: Логотип, Пошук, Профіль */}
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
        
        {/* Клієнтська кнопка мобільного меню (передаємо стан авторизації) */}
        <MobileMenuTrigger 
          isAuthenticated={isAuthenticated} 
          profileLink={profileLink} 
          userImage={userImage} 
        />

        {/* Логотип */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-md shadow-violet-200 group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-xl italic">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 leading-none">Mercora</span>
            <span className="text-[10px] text-gray-400 mt-1 hidden sm:inline">Маркетплейс нового покоління</span>
          </div>
        </Link>

        {/* Пошуковий рядок (десктоп) */}
        <div className="hidden lg:flex flex-1 max-w-2xl flex items-center border border-gray-200 rounded-full bg-gray-50/50 p-1 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100 transition-all">
          <button type="button" className="px-4 py-2 text-sm text-gray-600 font-medium hover:bg-gray-100 rounded-full flex items-center gap-1 shrink-0">
            Усі категорії <span className="text-[10px]">▼</span>
          </button>
          <div className="w-px h-6 bg-gray-200 my-auto"></div>
          <input 
            type="text" 
            placeholder="Пошук товарів, брендів і продавців..." 
            className="w-full bg-transparent px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <button type="button" className="w-10 h-10 bg-violet-600 hover:bg-violet-700 text-white rounded-full flex items-center justify-center transition-colors shrink-0">
            <Search size={18} />
          </button>
        </div>

        {/* Дії користувача */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 shrink-0">
          
          {/* 🔥 ДИНАМІЧНИЙ ПРОФІЛЬ (Увійти або Кругла Аватарка) */}
          <Link href={isAuthenticated ? profileLink : '/login'} className="flex items-center gap-2 text-left group">
            <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 group-hover:border-violet-500 group-hover:text-violet-600 transition-colors bg-white overflow-hidden relative shrink-0">
              {isAuthenticated && userImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={userImage} 
                  alt="Профіль" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={20} />
              )}
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-semibold text-gray-800 leading-none group-hover:text-violet-600">
                {profileText}
              </span>
              <span className="text-xs text-gray-400 mt-0.5">{profileSubtext}</span>
            </div>
          </Link>

          {/* Обране */}
          <Link href="/wishlist" className="relative w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:border-violet-500 hover:text-violet-600 transition-colors bg-white">
            <Heart size={20} />
            <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">3</span>
          </Link>

          {/* Кошик */}
          <Link href="/cart" className="relative flex items-center gap-2 text-left group">
            <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 group-hover:border-violet-500 group-hover:text-violet-600 transition-colors bg-white">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 right-auto sm:right-12 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">2</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-semibold text-gray-800 leading-none group-hover:text-violet-600">Кошик</span>
            </div>
          </Link>
        </div>

      </div>

      {/* Нижня десктопна панель категорій */}
      <div className="border-t border-gray-100 bg-white hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center gap-2 overflow-x-auto no-scrollbar text-sm font-medium text-gray-700">
          <Link href="/category/electronics" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-violet-600 transition-colors shrink-0"><Laptop size={16} className="text-gray-400" /> Електроніка</Link>
          <Link href="/category/fashion" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-violet-600 transition-colors shrink-0"><Shirt size={16} className="text-gray-400" /> Мода</Link>
          <Link href="/category/home" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-violet-600 transition-colors shrink-0"><Home size={16} className="text-gray-400" /> Для дому</Link>
          <Link href="/category/beauty" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-violet-600 transition-colors shrink-0"><HeartPulse size={16} className="text-gray-400" /> Краса і здоров'я</Link>
          <Link href="/category/sports" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-violet-600 transition-colors shrink-0"><Trophy size={16} className="text-gray-400" /> Спорт і відпочинок</Link>
          <Link href="/category/auto" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-violet-600 transition-colors shrink-0"><Car size={16} className="text-gray-400" /> Авто</Link>
          <Link href="/promotions" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-violet-600 hover:bg-violet-50 transition-colors shrink-0 ml-auto font-semibold"><Percent size={16} /> Акції</Link>
        </div>
      </div>
    </header>
  );
}



