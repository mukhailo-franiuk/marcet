import React from 'react';
import { Metadata } from 'next';
import RegisterForm from './RegisterForm';

export const metadata: Metadata = {
  title: 'Реєстрація нового користувача',
  description: 'Створіть свій профіль покупця або продавця на маркетплейсі нового покоління Mercora.',
  alternates: {
    canonical: 'https://mercora.com',
  },
};

export default function RegisterPage() {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-slate-50/50 flex items-center justify-center p-4 py-12">
      <RegisterForm />
    </div>
  );
}
