'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { registerUser } from '@/app/actions/register';
import { RegisterSchema } from '@/lib/validations/auth';
import { User, Mail, Lock, ShieldAlert, Store, Phone, CheckCircle, Loader2 } from 'lucide-react';

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [role, setRole] = useState<'CUSTOMER' | 'SELLER'>('CUSTOMER');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setValidationErrors({});

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as any;
    data.role = role; // Додаємо обрану роль

    // Клієнтська валідація через Zod
    const result = RegisterSchema.safeParse(data);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path && issue.path.length > 0) {
          errors[issue.path[0].toString()] = issue.message;
        }
      });
      setValidationErrors(errors);
      return;
    }

    // Відправка на сервер через Server Action
    startTransition(async () => {
      try {
        const response = await registerUser(result.data);
        if (response?.error) {
          setError(response.error);
        } else if (response?.success) {
          setSuccess(response.success);
          (e.target as HTMLFormElement).reset();
        }
      } catch (err) {
        setError('Непередбачувана помилка. Спробуйте пізніше.');
      }
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-100 p-8 rounded-3xl shadow-xl shadow-slate-100/50 font-sans">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Створення аккаунта</h2>
        <p className="text-xs text-gray-400 mt-1">Приєднуйтесь до маркетплейсу нового покоління Mercora</p>
      </div>

      {/* Перемикач Ролей (Таби) */}
      <div className="grid grid-cols-2 gap-1 bg-slate-50 border border-gray-200/60 p-1 rounded-xl mb-6">
        <button
          type="button"
          onClick={() => { setRole('CUSTOMER'); setError(null); setValidationErrors({}); }}
          className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${
            role === 'CUSTOMER' ? 'bg-white text-violet-600 shadow-sm' : 'text-gray-500 hover:text-slate-900'
          }`}
        >
          <User size={14} /> Покупець
        </button>
        <button
          type="button"
          onClick={() => { setRole('SELLER'); setError(null); setValidationErrors({}); }}
          className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all ${
            role === 'SELLER' ? 'bg-white text-violet-600 shadow-sm' : 'text-gray-500 hover:text-slate-900'
          }`}
        >
          <Store size={14} /> Продавець
        </button>
      </div>

      {/* Статуси відповіді від сервера */}
      {error && (
        <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 text-rose-600 text-xs p-3.5 rounded-xl mb-4">
          <ShieldAlert size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs p-3.5 rounded-xl mb-4">
          <CheckCircle size={16} className="shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Форма реєстрації */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Поле Ім'я */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700" htmlFor="name">Повне ім'я</label>
          <div className="relative flex items-center">
            <User size={16} className="absolute left-3.5 text-gray-400" />
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Олександр Петренко"
              disabled={isPending}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:bg-white transition-all text-slate-800"
            />
          </div>
          {validationErrors.name && <p className="text-[11px] font-medium text-rose-500 px-1">{validationErrors.name}</p>}
        </div>

        {/* Поле Email */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700" htmlFor="email">Електронна пошта</label>
          <div className="relative flex items-center">
            <Mail size={16} className="absolute left-3.5 text-gray-400" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@domain.com"
              disabled={isPending}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:bg-white transition-all text-slate-800"
            />
          </div>
          {validationErrors.email && <p className="text-[11px] font-medium text-rose-500 px-1">{validationErrors.email}</p>}
        </div>

        {/* Додаткові поля, які з'являються лише для Продавців */}
        {role === 'SELLER' && (
          <div className="space-y-4 border-t border-dashed border-gray-100 pt-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700" htmlFor="storeName">Назва вашого магазину</label>
              <div className="relative flex items-center">
                <Store size={16} className="absolute left-3.5 text-gray-400" />
                <input
                  id="storeName"
                  name="storeName"
                  type="text"
                  placeholder="Наприклад: ElectroTech"
                  disabled={isPending}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:bg-white transition-all text-slate-800"
                />
              </div>
              {validationErrors.storeName && <p className="text-[11px] font-medium text-rose-500 px-1">{validationErrors.storeName}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700" htmlFor="phone">Контактний телефон</label>
              <div className="relative flex items-center">
                <Phone size={16} className="absolute left-3.5 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+380991234567"
                  disabled={isPending}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:bg-white transition-all text-slate-800"
                />
              </div>
              {validationErrors.phone && <p className="text-[11px] font-medium text-rose-500 px-1">{validationErrors.phone}</p>}
            </div>
          </div>
        )}

        {/* Пароль */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700" htmlFor="password">Пароль</label>
          <div className="relative flex items-center">
            <Lock size={16} className="absolute left-3.5 text-gray-400" />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              disabled={isPending}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:bg-white transition-all text-slate-800"
            />
          </div>
          {validationErrors.password && <p className="text-[11px] font-medium text-rose-500 px-1">{validationErrors.password}</p>}
        </div>

        {/* Підтвердження пароля */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700" htmlFor="confirmPassword">Підтвердження пароля</label>
          <div className="relative flex items-center">
            <Lock size={16} className="absolute left-3.5 text-gray-400" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              disabled={isPending}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-violet-500 focus:bg-white transition-all text-slate-800"
            />
          </div>
          {validationErrors.confirmPassword && <p className="text-[11px] font-medium text-rose-500 px-1">{validationErrors.confirmPassword}</p>}
        </div>

                {/* Кнопка відправки */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-violet-100 hover:shadow-xl hover:shadow-violet-200 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2 text-sm disabled:opacity-70 disabled:pointer-events-none"
        >
          {isPending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Обробка даних...</span>
            </>
          ) : (
            <span>Зареєструватися</span>
          )}
        </button>
      </form>

      {/* Посилання на авторизацію */}
      <div className="text-center mt-6 text-xs text-gray-500">
        Вже маєте аккаунт?{' '}
        <Link href="/login" className="text-violet-600 hover:text-violet-700 font-bold transition-colors">
          Увійти
        </Link>
      </div>
    </div>
  );
}

