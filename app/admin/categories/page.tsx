
import { prisma } from '@/lib/prisma';
import AdminSidebar from '../componets/AdminSidebar';
import CategoryManager from './CategoryManager';

export const metadata = {
  title: 'Управління категоріями | Адмін-панель',
  description: 'Налаштування структури категорій та URL-слагів для маркетплейсу Mercora.',
};

export default async function AdminCategoriesPage() {
  // Отримуємо категорії та агрегуємо кількість прив'язаних товарів
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="w-full min-h-screen bg-slate-50 flex font-sans">
      {/* Бокове адмін-меню */}
      <AdminSidebar />

      {/* Основна робоча область */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen pt-16 md:pt-0">
        <div className="p-4 md:p-8 space-y-6 md:space-y-8 flex-1">
          
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">Категорії каталогу</h1>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              Управління глобальним деревом категорій маркетплейсу Mercora та оптимізація посадкових URL-сторінок
            </p>
          </div>

          {/* Інтерактивний менеджер категорій */}
          <CategoryManager initialCategories={categories} />

        </div>
      </div>
    </div>
  );
}
