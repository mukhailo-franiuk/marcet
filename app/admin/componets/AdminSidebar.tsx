'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutUser } from '@/app/actions/logout';
import ConfirmationModal from './ConfirmationModal';
import {
  Users,
  LayoutDashboard,
  ShoppingBag,
  BarChart3,
  Settings,
  LogOut,
  Loader2,
  Menu,
  X,
  Layers,
  ClipboardList
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Стан мобільного сайдбару

  const handleLogoutConfirm = () => {
    startTransition(async () => {
      await logoutUser();
      setIsModalOpen(false);
    });
  };

  // Додайте Layers до списку імпортів із 'lucide-react', якщо ще не додали:
  // import { Layers, ... } from 'lucide-react';

  const menuItems = [
    { href: '/admin/overview', label: 'Огляд панелі', icon: <LayoutDashboard size={18} /> },
    { href: '/admin', label: 'Продавці (Мерчанти)', icon: <Users size={18} /> },
    { href: '/admin/orders', label: 'Модерація замовлень', icon: <ClipboardList size={18} /> },
    { href: '/admin/categories', label: 'Категорії каталогу', icon: <Layers size={18} /> }, 
    { href: '/admin/products', label: 'Модерація товарів', icon: <ShoppingBag size={18} /> },
    { href: '/admin/analytics', label: 'Фінансова аналітика', icon: <BarChart3 size={18} /> },
    { href: '/admin/settings', label: 'Налаштування системи', icon: <Settings size={18} /> },
  ];


  return (
    <>
      {/* Кнопка ТРИГЕР для мобільного меню (Видна лише на екранах < md) */}
      <div className="md:hidden fixed top-3 left-4 z-50">
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800 flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Переключити меню"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Мобільний Backdrop-затемнення */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-35 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* САЙДБАР (Адаптивний клас керування зміщенням) */}
      <aside className={`w-64 bg-slate-900 text-slate-400 border-r border-slate-800 flex flex-col fixed h-screen top-0 left-0 z-40 shrink-0 transition-transform duration-300 md:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>

        {/* Логотип */}
        <div className="h-20 px-6 border-b border-slate-800 flex items-center gap-3 bg-slate-950/40 shrink-0 pl-16 md:pl-6">
          <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 to-fuchsia-500 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-black text-sm italic">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-white tracking-tight leading-none">Mercora Admin</span>
            <span className="text-[10px] text-violet-400 mt-1 font-semibold">Управління платформою</span>
          </div>
        </div>

        {/* Навігація */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 pt-6 text-sm font-semibold no-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/10' : 'hover:bg-slate-800/60 hover:text-white'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Кнопка виходу внизу сайдбару */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40 mt-auto shrink-0">
          <button
            type="button"
            onClick={() => { setIsMobileOpen(false); setIsModalOpen(true); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-950/40 text-rose-400 font-bold transition-all text-sm text-left"
          >
            <LogOut size={18} className="text-rose-500" />
            <span>Вийти з системи</span>
          </button>
        </div>
      </aside>

      {/* Сучасна модалка виходу */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        isPending={isPending}
        title="Вихід із системи"
        description="Ви впевнені, що хочете завершити поточну сесію адміністратора та повернутися на головну сторінку маркетплейсу?"
        confirmText="Вийти"
        cancelText="Залишитись"
      />
    </>
  );
}


