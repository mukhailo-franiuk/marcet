import React from 'react';
import Link from 'next/link';
import { Search, CreditCard, Box, ThumbsUp, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: '01',
    icon: <Search size={24} className="text-violet-600" />,
    title: 'Знайдіть товар',
    description: 'Скористайтеся розумним пошуком або каталогом, щоб вибрати найкращу пропозицію.',
  },
  {
    id: '02',
    icon: <CreditCard size={24} className="text-fuchsia-500" />,
    title: 'Безпечна оплата',
    description: 'Оплатіть замовлення на сайті картою. Кошти захищені системою безпечних угод Mercora.',
  },
  {
    id: '03',
    icon: <Box size={24} className="text-blue-500" />,
    title: 'Швидка доставка',
    description: 'Продавець надішле товар обраною службою або в безкоштовну точку видачі нашого маркетплейсу.',
  },
  {
    id: '04',
    icon: <ThumbsUp size={24} className="text-emerald-500" />,
    title: 'Отримання та відгук',
    description: 'Огляньте посилку. Тільки після вашого підтвердження кошти будуть перераховані продавцю.',
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-slate-50/50 py-12 md:py-16 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Заголовок блоку */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">
            Робити покупки — простіше, ніж здається
          </h2>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            Всього чотири простих кроки відокремлюють вас від безпечного та приємного онлайн-шопінгу на платформі Mercora.
          </p>
        </div>

        {/* Сітка кроків */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          
          {/* Фонові з'єднувальні стрілочки для десктопу (показуються лише на lg екранах) */}
          <div className="absolute top-1/4 left-0 w-full hidden lg:flex justify-around pointer-events-none px-12 z-0">
            <div className="w-full h-px bg-gradient-to-r from-violet-200 to-fuchsia-200 relative">
              <ArrowRight size={14} className="absolute -top-1.5 right-1/4 text-fuchsia-300 animate-pulse" />
            </div>
            <div className="w-full h-px bg-gradient-to-r from-fuchsia-200 to-blue-200 relative">
              <ArrowRight size={14} className="absolute -top-1.5 right-1/4 text-blue-300 animate-pulse" />
            </div>
            <div className="w-full h-px bg-gradient-to-r from-blue-200 to-emerald-200 relative">
              <ArrowRight size={14} className="absolute -top-1.5 right-1/4 text-emerald-300 animate-pulse" />
            </div>
          </div>

          {steps.map((step) => (
            <div 
              key={step.id} 
              className="group relative bg-white border border-gray-100/80 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 z-10 flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              {/* Порядковий номер */}
              <span className="absolute top-4 right-6 text-3xl font-black bg-gradient-to-b from-slate-100 to-white bg-clip-text text-transparent group-hover:from-violet-100 group-hover:to-white transition-all select-none">
                {step.id}
              </span>

              {/* Круглий контейнер для іконки */}
              <div className="w-12 h-12 bg-slate-50 border border-slate-100/60 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:scale-110 group-hover:shadow-md transition-all duration-300 mb-5">
                {step.icon}
              </div>

              {/* Назва та опис кроку */}
              <h3 className="text-base font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mt-2 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}

        </div>

        {/* Закликання до дії (CTA) */}
        <div className="flex justify-center mt-12">
          <Link 
            href="/catalog" 
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-violet-600 text-white font-semibold px-6 py-3 rounded-xl shadow-sm text-sm transition-all group"
          >
            Спробувати прямо зараз
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
