import React from 'react';
import { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Вхід до особистого кабінету',
  description: 'Авторизуйтесь на маркетплейсі Mercora, щоб отримати доступ до кошика, збережених товарів та історії ваших замовлень.',
  alternates: {
    canonical: 'https://mercora.com',
  },
};

export default function LoginPage() {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-slate-50/50 flex items-center justify-center p-4 py-12">
      <LoginForm />
    </div>
  );
}
