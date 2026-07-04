'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Menu, X, Search, User, ChevronRight, Laptop, Shirt, Home, HeartPulse, Trophy, Car, Percent 
} from 'lucide-react';

interface MobileMenuTriggerProps {
  isAuthenticated: boolean;
  profileLink: string;
  userImage?: string;
}

export default function MobileMenuTrigger({ isAuthenticated, profileLink, userImage }: MobileMenuTriggerProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Кнопка бургера */}
      <button 
        type="button"
        onClick={() => setIsMenuOpen(true)}
        className="lg:hidden p-2 text-gray-600 hover:text-violet-600 rounded-xl hover:bg-gray-50 transition-colors"
        aria-label="Відкрити мобільне меню"
      >
        <Menu size={24} />
      </button>

      {/* Клієнтський мобільний Drawer */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />

        <aside className={`absolute top-0 left-0 bottom-0 w-full max-w-xs bg-white shadow-2xl flex flex-col transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-20 px-4 border-b border-gray-100 flex items-center justify-between shrink-0">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 to-fuchsia-500 rounded-lg flex items-center justify-center shadow-md"><span className="text-white font-black text-sm italic">M</span></div>
              <span className="text-lg font-bold text-slate-900">Mercora</span>
            </Link>
            <button type="button" onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-500 hover:text-slate-900 rounded-lg"><X size={20} /></button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
            <div className="relative w-full flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1.5 focus-within:border-violet-500 transition-all">
              <input type="text" placeholder="Пошук..." className="w-full bg-transparent px-3 py-1 text-sm text-gray-700 focus:outline-none placeholder-gray-400" />
              <button type="button" className="w-8 h-8 bg-violet-600 text-white rounded-lg flex items-center justify-center"><Search size={14} /></button>
            </div>

            {/* Динамічний блок авторизації для мобільного */}
            <Link 
              href={isAuthenticated ? profileLink : '/login'} 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 overflow-hidden relative shrink-0">
                {isAuthenticated && userImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={userImage} alt="Профіль" className="w-full h-full object-cover" />
                ) : (
                  <User size={18} />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800">{isAuthenticated ? 'Мій кабінет' : 'Увійти в кабінет'}</span>
                <span className="text-xs text-gray-400">{isAuthenticated ? 'Перейти до профілю' : 'Керування замовленнями'}</span>
              </div>
              <ChevronRight size={16} className="text-gray-400 ml-auto" />
            </Link>

            <div className="space-y-1">
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">Категорії</h4>
              <Link href="/category/electronics" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-gray-700 rounded-xl hover:bg-violet-50"><Laptop size={18} className="text-gray-400" /><span>Електроніка</span></Link>
              <Link href="/category/fashion" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-gray-700 rounded-xl hover:bg-violet-50"><Shirt size={18} className="text-gray-400" /><span>Мода і стиль</span></Link>
              <Link href="/category/home" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-gray-700 rounded-xl hover:bg-violet-50"><Home size={18} className="text-gray-400" /><span>Для дому</span></Link>
              <Link href="/category/beauty" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-gray-700 rounded-xl hover:bg-violet-50"><HeartPulse size={18} className="text-gray-400" /><span>Краса і здоров'я</span></Link>
              <Link href="/category/sports" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-gray-700 rounded-xl hover:bg-violet-50"><Trophy size={18} className="text-gray-400" /><span>Спорт</span></Link>
              <Link href="/category/auto" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-gray-700 rounded-xl hover:bg-violet-50"><Car size={18} className="text-gray-400" /><span>Автотовари</span></Link>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <Link href="/promotions" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 text-sm font-bold text-violet-600 bg-violet-50 rounded-xl"><Percent size={18} /><span>Усі акції</span></Link>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-slate-50 text-center text-xs text-gray-400 shrink-0">
            <span>© {new Date().getFullYear()} Mercora Marketplace</span>
          </div>
        </aside>
      </div>
    </>
  );
}
