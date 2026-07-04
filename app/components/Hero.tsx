import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full bg-slate-50 py-16 md:py-24 overflow-hidden font-sans">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-violet-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-fuchsia-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <div className="flex flex-col items-start text-left space-y-6">
          <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-700 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={14} />
            Маркетплейс нового покоління
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Купуйте розумно.<br />
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
              Знайдіть усе
            </span> в один клік.
          </h1>
          
          <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
            Мільйони товарів від перевірених брендів із надшвидкою доставкою. Відкрийте для себе абсолютно новий досвід онлайн-шопінгу.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/catalog" className="inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-violet-200 hover:shadow-xl transition-all group text-center">
              Перейти до покупок
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/merchant/register" className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-full shadow-sm transition-all text-center">
              <ShoppingBag size={18} />
              Стати продавцем
            </Link>
          </div>
        </div>

        {/* Visual Box / Banner placeholder */}
        <div className="relative w-full aspect-[4/3] max-w-xl mx-auto lg:mx-0 bg-gradient-to-tr from-violet-600/10 to-fuchsia-500/10 rounded-3xl border border-white p-4 shadow-xl flex items-center justify-center backdrop-blur-sm">
          <div className="w-full h-full bg-white rounded-2xl shadow-inner flex flex-col items-center justify-center p-8 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-tr from-violet-600 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-md shadow-violet-100 animate-pulse">
              <ShoppingBag size={36} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Тут може бути ваш банер</h3>
            <p className="text-sm text-gray-400 mt-2 max-w-xs">
              Гарячі знижки сезону, трендові новинки або актуальні промо-кампанії.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
