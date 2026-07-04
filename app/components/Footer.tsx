import React from 'react';
import Link from 'next/link';
import {
    Mail,
    Phone,
    Clock,
    ArrowRight,
    Globe
} from 'lucide-react';

export default function Footer() {
    return (
        <footer className="w-full bg-slate-900 text-slate-300 font-sans mt-auto border-t border-slate-800">

            {/* 1. Блок підписки на розсилку */}
            <div className="border-b border-slate-800 bg-slate-950/40">
                <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="max-w-md text-center lg:text-left">
                        <h3 className="text-xl font-bold text-white tracking-tight">Будьте в курсі знижок та новинок</h3>
                        <p className="text-sm text-slate-400 mt-1">Отримуйте найкращі пропозиції від Mercora першими на свій email.</p>
                    </div>
                    <form className="w-full max-w-md flex items-center bg-slate-800 border border-slate-700/60 rounded-full p-1 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
                        <input
                            type="email"
                            placeholder="Ваш електронний адрес..."
                            required
                            className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-violet-600 hover:bg-violet-700 text-white rounded-full p-2.5 transition-colors shrink-0 group"
                        >
                            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>

            {/* 2. Основна навігаційна сітка посилань */}
            <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

                {/* Блок бренду та соцмереж */}
                <div className="lg:col-span-1 flex flex-col space-y-5">
                    <Link href="/" className="flex items-center gap-3 shrink-0 group">
                        <div className="w-9 h-9 bg-gradient-to-tr from-violet-600 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-white font-black text-lg italic">M</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">Mercora</span>
                    </Link>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Сучасний маркетплейс нового покоління. Об'єднуємо найкращих продавців та мільйони задоволених покупців.
                    </p>

                    {/* Соціальні мережі через Link та вбудовані SVG */}
                    <div className="flex items-center gap-3 pt-2">
                        {/* Facebook */}
                        <Link href="/social/facebook" aria-label="Facebook" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-violet-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                            </svg>
                        </Link>
                        {/* Instagram */}
                        <Link href="/social/instagram" aria-label="Instagram" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-violet-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                            <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </Link>

                        {/* YouTube */}
                        <Link href="/social/youtube" aria-label="YouTube" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-violet-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </Link>
                        {/* X / Twitter */}
                        <Link href="/social/x" aria-label="X (Twitter)" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-violet-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Стовпець 1: Покупцям */}
                <div>
                    <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Покупцям</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/help" className="hover:text-violet-400 transition-colors">Довідка та FAQ</Link></li>
                        <li><Link href="/delivery" className="hover:text-violet-400 transition-colors">Оплата та доставка</Link></li>
                        <li><Link href="/returns" className="hover:text-violet-400 transition-colors">Повернення товару</Link></li>
                        <li><Link href="/buyer-protection" className="hover:text-violet-400 transition-colors">Захист покупця</Link></li>
                        <li><Link href="/bonus-program" className="hover:text-violet-400 transition-colors">Бонусна програма</Link></li>
                    </ul>
                </div>

                {/* Стовпець 2: Продавцям */}
                <div>
                    <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Продавцям</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/sell" className="hover:text-violet-400 transition-colors">Продавати на Mercora</Link></li>
                        <li><Link href="/merchant-rules" className="hover:text-violet-400 transition-colors">Правила для продавців</Link></li>
                        <li><Link href="/advertising" className="hover:text-violet-400 transition-colors">Реклама на платформі</Link></li>
                        <li><Link href="/cabinet" className="hover:text-violet-400 transition-colors">Особистий кабінет</Link></li>
                        <li><Link href="/api-docs" className="hover:text-violet-400 transition-colors">Документація API</Link></li>
                    </ul>
                </div>

                {/* Стовпець 3: Про компанію */}
                <div>
                    <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Про компанію</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about" className="hover:text-violet-400 transition-colors">Про нас</Link></li>
                        <li><Link href="/careers" className="hover:text-violet-400 transition-colors">Вакансії</Link></li>
                        <li><Link href="/news" className="hover:text-violet-400 transition-colors">Блог та новини</Link></li>
                        <li><Link href="/contacts" className="hover:text-violet-400 transition-colors">Контакти</Link></li>
                        <li><Link href="/partners" className="hover:text-violet-400 transition-colors">Партнерська програма</Link></li>
                    </ul>
                </div>

                {/* Стовпець 4: Контакти та техпідтримка */}
                <div className="flex flex-col space-y-4">
                    <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Підтримка 24/7</h4>
                    <div className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                            <Phone size={16} className="text-violet-500 mt-1 shrink-0" />
                            <div className="flex flex-col">
                                <Link href="tel:0800123456" className="text-white font-semibold hover:text-violet-400 transition-colors">
                                    0 800 123 456
                                </Link>
                                <span className="text-xs text-slate-500">Безкоштовно по Україні</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Mail size={16} className="text-violet-500 mt-1 shrink-0" />
                            <Link href="mailto:support@mercora.com" className="hover:text-violet-400 transition-colors break-all">
                                support@mercora.com
                            </Link>
                        </div>
                        <div className="flex items-start gap-3 text-xs text-slate-400">
                            <Clock size={16} className="text-violet-500 shrink-0" />
                            <span>Пн-Нд: 09:00 - 21:00</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* 3. Нижня технічна панель */}
            <div className="border-t border-slate-800 bg-slate-950/60">
                <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">

                    {/* Копірайт та юридичні лінки */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                        <span>© {new Date().getFullYear()} Mercora Marketplace. Всі права захищені.</span>
                        <div className="flex items-center gap-3">
                            <Link href="/privacy" className="hover:text-slate-400 transition-colors">Конфіденційність</Link>
                            <span className="text-slate-700">•</span>
                            <Link href="/terms" className="hover:text-slate-400 transition-colors">Умови використання</Link>
                        </div>
                    </div>

                    {/* Регіональні налаштування та платіжні лінки */}
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        {/* Мова та валюта */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="/change-language"
                                className="flex items-center gap-1.5 hover:text-slate-300 transition-colors"
                            >
                                <Globe size={14} />
                                <span>Українська</span>
                            </Link>
                            <span className="text-slate-700">|</span>
                            <Link
                                href="/change-currency"
                                className="hover:text-slate-300 transition-colors font-medium"
                            >
                                UAH (₴)
                            </Link>
                        </div>

                        {/* Платіжні системи */}
                        <Link
                            href="/delivery-and-payment"
                            className="flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors group"
                            aria-label="Інформація про методи оплати"
                        >
                            <div className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-[10px] font-bold tracking-wider group-hover:border-slate-600">VISA</div>
                            <div className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-[10px] font-bold tracking-wider group-hover:border-slate-600">MC</div>
                            <div className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-[10px] font-bold tracking-wider group-hover:border-slate-600">APAY</div>
                            <div className="px-2 py-1 bg-slate-800 rounded border border-slate-700 text-[10px] font-bold tracking-wider group-hover:border-slate-600">GPAY</div>
                        </Link>
                    </div>

                </div>
            </div>

        </footer>
    );
}




