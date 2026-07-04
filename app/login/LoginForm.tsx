'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/app/actions/login';
import { LoginSchema } from '@/lib/validations/login';
import { Mail, Lock, ShieldAlert, CheckCircle, Loader2, LogIn } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
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

    // Клієнтська валідація Zod перед відправкою
    const result = LoginSchema.safeParse(data);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path && issue.path.length > 0) {
          errors[issue.path.toString()] = issue.message;
        }
      });
      setValidationErrors(errors);
      return;
    }

    // Передаємо дані у Server Action
    startTransition(async () => {
      const response = await loginUser(result.data);
      
      if (response?.error) {
        setError(response.error);
      } else if (response?.success) {
        setSuccess(response.success);
        (e.target as HTMLFormElement).reset();

        // Розумне перенаправлення на основі ролі користувача
        setTimeout(() => {
          if (response.role === 'ADMIN') {
            router.push('/admin');
          } else if (response.role === 'SELLER') {
            router.push('/seller');
          } else {
            router.push('/profile'); // Кабінет звичайного покупця
          }
          router.refresh();
        }, 1000);
      }
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white border border-gray-100 p-8 rounded-3xl shadow-xl shadow-slate-100/50 font-sans">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Вхід у кабінет</h2>
        <p className="text-xs text-gray-400 mt-1">Авторизуйтесь, щоб керувати покупками та замовленнями</p>
      </div>

      {/* Повідомлення про статус від сервера */}
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

      {/* Форма */}
      <form onSubmit={handleSubmit} className="space-y-4">
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

        {/* Поле Пароль */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700" htmlFor="password">Пароль</label>
            <Link href="/forgot-password" className="text-[11px] font-semibold text-violet-600 hover:text-violet-700 transition-colors">
              Забули пароль?
            </Link>
          </div>
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

        {/* Кнопка входу */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-100 hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2 text-sm disabled:opacity-70 disabled:pointer-events-none"
        >
          {isPending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Перевірка даних...</span>
            </>
          ) : (
            <>
              <LogIn size={16} />
              <span>Увійти</span>
            </>
          )}
        </button>
      </form>

      {/* Посилання на реєстрацію */}
      <div className="text-center mt-6 text-xs text-gray-500">
        Немає аккаунта на Mercora?{' '}
        <Link href="/register" className="text-violet-600 hover:text-violet-700 font-bold transition-colors">
          Зареєструватися
        </Link>
      </div>
    </div>
  );
}
