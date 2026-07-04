
import { prisma } from '@/lib/prisma';
import AdminSidebar from '../componets/AdminSidebar';
import OrderModerationRow from './OrderModerationRow';
import { ClipboardList, Wallet, Truck, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Управління замовленнями | Панель адміністратора',
  description: 'Глобальний реєстр та модерація замовлень на маркетплейсі Mercora.',
};

export default async function AdminOrdersPage() {
  // Паралельно завантажуємо замовлення та лічильники статусів для аналітики
  const [orders, totalOrders, pendingCount, shippedCount, totalRevenue] = await Promise.all([
    prisma.order.findMany({
      include: {
        customer: { select: { email: true } },
        _count: { select: { items: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.order.count(),
    prisma.order.count({ where: { status: 'PENDING' } }),
    prisma.order.count({ where: { status: 'SHIPPED' } }),
    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: { not: 'CANCELLED' } } // Обіг без врахування скасованих угод
    }),
  ]);

  const currentAdminUserId = "admin-user-id-placeholder";

  return (
    <div className="w-full min-h-screen bg-slate-50 flex font-sans">
      <AdminSidebar />

      <div className="flex-1 md:pl-64 flex flex-col min-h-screen pt-16 md:pt-0">
        <div className="p-4 md:p-8 space-y-6 md:space-y-8 flex-1">
          
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">Модерація замовлень</h1>
            <p className="text-xs md:text-sm text-gray-400 mt-1">
              Контроль статусів логістики, обробка безпечних транзакцій та виплата коштів продавцям Mercora
            </p>
          </div>

          {/* Віджети статистики замовлень */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center shrink-0"><ClipboardList size={22} /></div>
              <div><span className="block text-xl md:text-2xl font-black text-slate-950">{totalOrders}</span><span className="text-xs text-gray-400 font-medium">Всього замовлень</span></div>
            </div>
            
            <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0"><AlertCircle size={22} /></div>
              <div><span className="block text-xl md:text-2xl font-black text-slate-950">{pendingCount}</span><span className="text-xs text-gray-400 font-medium">Очікують оплати</span></div>
            </div>
            
            <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0"><Truck size={22} /></div>
              <div><span className="block text-xl md:text-2xl font-black text-slate-950">{shippedCount}</span><span className="text-xs text-gray-400 font-medium">У дорозі (доставка)</span></div>
            </div>
            
            <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0"><Wallet size={22} /></div>
              <div>
                <span className="block text-lg md:text-xl font-black text-slate-950">{(totalRevenue._sum.totalAmount || 0).toLocaleString('uk-UA')} ₴</span>
                <span className="text-xs text-gray-400 font-medium">Загальний обіг (GMV)</span>
              </div>
            </div>
          </div>

          {/* Головна Таблиця Замовлень */}
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-slate-100/40 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="font-bold text-slate-900 text-base md:text-lg">Реєстр фінансових операцій</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 font-bold text-xs uppercase tracking-wider border-b border-gray-100">
                    <th className="px-6 py-4">ID / Дата</th>
                    <th className="px-6 py-4">Отримувач</th>
                    <th className="px-6 py-4">Адреса доставки</th>
                    <th className="px-6 py-4 text-center">Елементи</th>
                    <th className="px-6 py-4">Сума чеку</th>
                    <th className="px-6 py-4">Статус</th>
                    <th className="px-6 py-4 text-right">Дії</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">Наразі замовлень на маркетплейсі немає.</td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <OrderModerationRow key={order.id} order={order} adminUserId={currentAdminUserId} />
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
