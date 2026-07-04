
import { prisma } from '@/lib/prisma';
import SellerRow from './componets/SellerRow';
import AdminSidebar from './componets/AdminSidebar';
import { Users, ShieldAlert, Award, Wallet } from 'lucide-react';

export const metadata = {
  title: 'Панель адміністратора | Mercora',
  description: 'Головний кабінет контролю мерчантів та фінансів платформи Mercora.',
};

export default async function AdminPage() {
  // 1. Асинхронний паралельний запит аналітики з бази Neon
  const [sellers, totalStores, pendingStores, totalBalance] = await Promise.all([
    prisma.sellerProfile.findMany({
      include: {
        user: true,
        _count: { select: { products: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.sellerProfile.count(),
    prisma.sellerProfile.count({ where: { isVerified: false } }),
    prisma.sellerProfile.aggregate({ _sum: { balance: true } }),
  ]);

  // Заглушка ID авторизованого адміна для логування системних подій
  const currentAdminUserId = "admin-user-id-placeholder";

  return (
    <div className="w-full min-h-screen bg-slate-50 flex font-sans relative">
      
      {/* Адаптивний Сайдбар (Авто-ховеться на мобільних і виїжджає по кліку на бургер) */}
      <AdminSidebar />

      {/* ОСНОВНИЙ КОНТЕНТ (pt-16 компенсує плаваючу кнопку бургера на телефонах) */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen pt-16 md:pt-0">
        
        {/* Внутрішній робочий простір */}
        <div className="p-4 md:p-8 space-y-6 md:space-y-8 flex-1">
          
          {/* Шапка робочої зони */}
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">Реєстр продавців</h1>
            <p className="text-xs md:text-sm text-gray-400 mt-1">Керування ліцензіями магазинів, фінанси та модерація мерчантів Mercora</p>
          </div>

          {/* Метрики / Статистика (Адаптивна сітка 1 -> 2 -> 4 стовпці) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center shrink-0">
                <Users size={22} />
              </div>
              <div>
                <span className="block text-xl md:text-2xl font-black text-slate-950">{totalStores}</span>
                <span className="text-xs text-gray-400 font-medium">Мерчантів</span>
              </div>
            </div>
            
            <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                <ShieldAlert size={22} />
              </div>
              <div>
                <span className="block text-xl md:text-2xl font-black text-slate-950">{pendingStores}</span>
                <span className="text-xs text-gray-400 font-medium">На модерації</span>
              </div>
            </div>
            
            <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                <Award size={22} />
              </div>
              <div>
                <span className="block text-xl md:text-2xl font-black text-slate-950">{totalStores - pendingStores}</span>
                <span className="text-xs text-gray-400 font-medium">Верифіковані</span>
              </div>
            </div>
            
            <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <Wallet size={22} />
              </div>
              <div>
                <span className="block text-lg md:text-xl font-black text-slate-950">
                  {(totalBalance._sum.balance || 0).toLocaleString('uk-UA')} ₴
                </span>
                <span className="text-xs text-gray-400 font-medium">Загальний баланс</span>
              </div>
            </div>
          </div>

          {/* КОНТЕЙНЕР РЕЄСТРУ ПАРТНЕРІВ */}
          <div className="bg-transparent md:bg-white border-none md:border md:border-gray-100 rounded-3xl md:shadow-xl md:shadow-slate-100/40 overflow-hidden">
            <div className="bg-white p-4 rounded-2xl md:rounded-none border border-gray-100 md:border-none md:px-6 md:py-5 md:border-b flex items-center justify-between shadow-sm md:shadow-none mb-4 md:mb-0">
              <h3 className="font-bold text-slate-900 text-base md:text-lg">Облікові записи партнерів</h3>
              <span className="bg-violet-50 text-violet-700 text-xs px-2.5 py-1 rounded-full font-bold">
                Всього: {sellers.length}
              </span>
            </div>
            
            {/* 1. НА ДЕСКТОПАХ рендериться класична таблиця */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 font-bold text-xs uppercase tracking-wider border-b border-gray-100">
                    <th className="px-6 py-4">Магазин</th>
                    <th className="px-6 py-4">Власник</th>
                    <th className="px-6 py-4">Телефон</th>
                    <th className="px-6 py-4 text-center">Товари</th>
                    <th className="px-6 py-4">Баланс</th>
                    <th className="px-6 py-4">Модерація</th>
                    <th className="px-6 py-4">Доступ</th>
                    <th className="px-6 py-4 text-right">Дії</th>
                  </tr>
                </thead>
                <tbody>
                  {sellers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-gray-400 text-sm">
                        Наразі на платформі немає зареєстрованих продавців.
                      </td>
                    </tr>
                  ) : (
                    sellers.map((seller) => (
                      <SellerRow key={seller.id} seller={seller} adminUserId={currentAdminUserId} />
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* 2. НА МОБІЛКАХ рендериться сітка карток (Активується автоматично на < md екранах) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {sellers.length === 0 ? (
                <div className="bg-white border p-6 text-center text-gray-400 text-sm rounded-2xl shadow-sm">
                  Наразі на платформі немає зареєстрованих продавців.
                </div>
              ) : (
                sellers.map((seller) => (
                  <SellerRow key={seller.id} seller={seller} adminUserId={currentAdminUserId} />
                ))
              )}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}


