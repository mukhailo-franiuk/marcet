import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, BadgePercent, Headphones, RefreshCw, Zap } from 'lucide-react';

const advantages = [
  {
    id: 1,
    icon: <Truck size={24} className="text-violet-600" />,
    title: 'Швидка доставка',
    description: 'Відправляємо замовлення у день оформлення. Безкоштовна доставка в точки видачі Mercora.',
  },
  {
    id: 2,
    icon: <ShieldCheck size={24} className="text-emerald-500" />,
    title: 'Безпечна оплата',
    description: '100% захист покупця. Гроші перераховуються продавцю лише після того, як ви заберете товар.',
  },
  {
    id: 3,
    icon: <BadgePercent size={24} className="text-amber-500" />,
    title: 'Програма лояльності',
    description: 'Кешбек та бонуси з кожної покупки. Економте до 50% на наступних замовленнях.',
  },
  {
    id: 4,
    icon: <Headphones size={24} className="text-blue-500" />,
    title: 'Підтримка 24/7',
    description: 'Наша турботлива служба підтримки завжди на зв’язку в чаті або за телефоном гарячої лінії.',
  },
  {
    id: 5,
    icon: <RefreshCw size={24} className="text-fuchsia-500" />,
    title: 'Легке повернення',
    description: 'Не підійшов товар? Повертайте або обмінюйте без зайвих питань протягом 14 днів.',
  },
  {
    id: 6,
    icon: <Zap size={24} className="text-rose-500" />,
    title: 'Тільки перевірені бренди',
    description: 'Ретельно моніторимо якість товарів та репутацію продавців перед допуском на платформу.',
  },
];

export default function Advantages() {
  return (
    <section className="w-full bg-white py-12 md:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Заголовок секції */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">
            Чому обирають Mercora?
          </h2>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            Ми створюємо екосистему розумного шопінгу, де кожен клієнт отримує максимальний сервіс, швидкість та безпеку.
          </p>
        </div>

        {/* Сітка переваг */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {advantages.map((item) => (
            <div 
              key={item.id} 
              className="group p-6 bg-slate-50/60 border border-slate-100/80 rounded-2xl flex flex-col items-start hover:bg-white hover:shadow-xl hover:shadow-slate-100 hover:border-transparent transition-all duration-300"
            >
              {/* Іконка у контейнері */}
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-300 mb-4">
                {item.icon}
              </div>

              {/* Текст */}
              <h3 className="text-base font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Інформаційна плашка знизу */}
        <div className="mt-12 p-6 md:p-8 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-violet-100">
          <div className="max-w-xl text-center md:text-left">
            <h4 className="text-lg md:text-xl font-extrabold tracking-tight">Бажаєте продавати свої товари на Mercora?</h4>
            <p className="text-xs md:text-sm text-white/80 mt-1">Отримайте доступ до мільйонної аудиторії покупців, зручну CRM-панель та швидкі виплати вже сьогодні.</p>
          </div>
          <Link 
            href="/merchant/register" 
            className="whitespace-nowrap bg-white text-slate-900 hover:bg-slate-50 font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all shrink-0 hover:scale-[1.02]"
          >
            Відкрити магазин
          </Link>
        </div>

      </div>
    </section>
  );
}
