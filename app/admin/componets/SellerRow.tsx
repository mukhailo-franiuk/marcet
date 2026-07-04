'use client';

import React, { useState, useTransition } from 'react';
import { toggleStoreVerification, toggleUserStatus } from '@/app/actions/admin';
import ConfirmationModal from './ConfirmationModal';
import { Check, X, ShieldCheck, Ban, RefreshCw, AlertTriangle, MoreVertical, Wallet, Phone, ShoppingBag } from 'lucide-react';

interface SellerRowProps {
  seller: any;
  adminUserId: string;
}

export default function SellerRow({ seller, adminUserId }: SellerRowProps) {
  const [isVerifyPending, startVerifyTransition] = useTransition();
  const [isBanPending, startBanTransition] = useTransition();
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [isMobileActionsOpen, setIsMobileActionsOpen] = useState(false); // Для мобільних екшенів

  const handleToggleVerify = () => {
    startVerifyTransition(async () => {
      await toggleStoreVerification(seller.id, seller.isVerified, adminUserId);
      setIsMobileActionsOpen(false);
    });
  };

  const handleToggleBanConfirm = () => {
    startTransitionVerifyAndBan();
  };

  const startTransitionVerifyAndBan = () => {
    startBanTransition(async () => {
      await toggleUserStatus(seller.user.id, seller.user.isActive, adminUserId);
      setIsBanModalOpen(false);
      setIsMobileActionsOpen(false);
    });
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. ВЕРСТКА ДЛЯ ДЕСКТОПУ (КЛАСИЧНИЙ РЯДОК ТАБЛИЦІ) */}
      {/* ========================================================================= */}
      <tr className="border-b border-gray-100 hover:bg-slate-50/50 transition-colors text-sm text-slate-700 hidden md:table-row">
        <td className="px-6 py-4">
          <div className="flex flex-col">
            <span className="font-bold text-slate-900">{seller.storeName}</span>
            <span className="text-xs text-gray-400">slug: {seller.storeSlug}</span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex flex-col">
            <span className="font-medium text-slate-800">{seller.user.name || 'Не вказано'}</span>
            <span className="text-xs text-gray-400">{seller.user.email}</span>
          </div>
        </td>
        <td className="px-6 py-4 text-xs font-mono">{seller.phone}</td>
        <td className="px-6 py-4 text-center font-semibold">{seller._count.products}</td>
        <td className="px-6 py-4 font-bold text-slate-900">{seller.balance.toLocaleString('uk-UA')} ₴</td>
        <td className="px-6 py-4">
          {seller.isVerified ? (
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-semibold border border-emerald-100"><ShieldCheck size={14} /> Перевірено</span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-full font-semibold border border-amber-100"><AlertTriangle size={14} /> Модерація</span>
          )}
        </td>
        <td className="px-6 py-4">{seller.user.isActive ? <span className="text-emerald-500 text-xs">Активний</span> : <span className="text-rose-500 font-bold text-xs">Заблокований</span>}</td>
        <td className="px-6 py-4 text-right">
          <div className="flex items-center justify-end gap-2">
            <button type="button" onClick={handleToggleVerify} disabled={isVerifyPending || isBanPending} className="p-2 rounded-xl border bg-white hover:bg-slate-50 text-slate-700 transition-colors disabled:opacity-50">
              {isVerifyPending ? <RefreshCw size={14} className="animate-spin" /> : seller.isVerified ? <X size={14} className="text-amber-500" /> : <Check size={14} className="text-emerald-500" />}
            </button>
            <button type="button" onClick={() => setIsBanModalOpen(true)} disabled={isVerifyPending || isBanPending} className={`p-2 rounded-xl border transition-all ${seller.user.isActive ? 'bg-white hover:bg-rose-50 text-rose-600' : 'bg-emerald-600 text-white'}`}>
              {isBanPending ? <RefreshCw size={14} className="animate-spin" /> : seller.user.isActive ? <Ban size={14} /> : <Check size={14} />}
            </button>
          </div>
        </td>
      </tr>

      {/* ========================================================================= */}
      {/* 2. ВЕРСТКА ДЛЯ МОБІЛЬНОГО (КРАСИВА СУЧАСНА КАРТКА) */}
      {/* ========================================================================= */}
      <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm md:hidden flex flex-col space-y-4 relative">
        {/* Кнопка виклику швидких мобільних дій */}
        <button
          type="button"
          onClick={() => setIsMobileActionsOpen(!isMobileActionsOpen)}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-slate-900 rounded-lg hover:bg-gray-50 transition-all"
        >
          <MoreVertical size={18} />
        </button>

        {/* Шапка картки магазину */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 font-bold shrink-0">
            {seller.storeName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col max-w-[70%]">
            <h4 className="font-black text-slate-900 leading-tight truncate">{seller.storeName}</h4>
            <span className="text-xs text-gray-400 truncate">{seller.user.email}</span>
          </div>
        </div>

        {/* Статуси */}
        <div className="flex flex-wrap gap-2 pt-1">
          {seller.isVerified ? (
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-emerald-100"><ShieldCheck size={12} /> Перевірено</span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-amber-100"><AlertTriangle size={12} /> Модерація</span>
          )}
          {seller.user.isActive ? (
            <span className="inline-flex bg-slate-50 text-slate-600 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-gray-200">Активний</span>
          ) : (
            <span className="inline-flex bg-rose-50 text-rose-600 text-[10px] px-2.5 py-0.5 rounded-full font-bold border border-rose-100">Заблокований</span>
          )}
        </div>

        {/* Специфікації (Баланс, телефон, товари) */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50/70 p-3 rounded-xl text-center border border-gray-100/40">
          <div className="flex flex-col items-center">
            <Wallet size={14} className="text-gray-400 mb-0.5" />
            <span className="text-[10px] text-gray-400 font-medium">Баланс</span>
            <span className="text-xs font-black text-slate-900 mt-0.5">{seller.balance} ₴</span>
          </div>
          <div className="flex flex-col items-center border-x border-gray-200/60">
            <ShoppingBag size={14} className="text-gray-400 mb-0.5" />
            <span className="text-[10px] text-gray-400 font-medium">Товари</span>
            <span className="text-xs font-black text-slate-900 mt-0.5">{seller._count.products}</span>
          </div>
          <div className="flex flex-col items-center">
            <Phone size={14} className="text-gray-400 mb-0.5" />
            <span className="text-[10px] text-gray-400 font-medium">Контакт</span>
            <span className="text-[10px] font-mono text-slate-800 font-bold mt-1 truncate max-w-full">{seller.phone.slice(-4)}</span>
          </div>
        </div>

        {/* ВИСУВНЕ МЕНЮ ДІЙ ДЛЯ МОБІЛКИ (Плавний Drawer знизу) */}
        {isMobileActionsOpen && (
          <div className="absolute inset-0 bg-white/95 rounded-2xl backdrop-blur-sm p-4 flex flex-col justify-center space-y-2 z-10 animate-in fade-in duration-150">
            <button
              type="button"
              onClick={handleToggleVerify}
              disabled={isVerifyPending || isBanPending}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
            >
              {isVerifyPending ? <RefreshCw size={14} className="animate-spin" /> : seller.isVerified ? 'Скасувати верифікацію магазину' : 'Схвалити та верифікувати'}
            </button>
            <button
              type="button"
              onClick={() => { setIsBanModalOpen(true); setIsMobileActionsOpen(false); }}
              disabled={isVerifyPending || isBanPending}
              className={`w-full font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 border ${seller.user.isActive ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-emerald-600 text-white border-transparent'
                }`}
            >
              {seller.user.isActive ? 'Заблокувати мерчанта (БАН)' : 'Розблокувати мерчанта'}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileActionsOpen(false)}
              className="w-full bg-slate-100 text-slate-600 font-medium py-2 rounded-xl text-xs mt-1"
            >
              Закрити меню дій
            </button>
          </div>
        )}
      </div>

      {/* СУЧАСНЕ МОДАЛЬНЕ ВІКНО БЛОКУВАННЯ ПРОДАВЦЯ */}
      <ConfirmationModal
        isOpen={isBanModalOpen}
        onClose={() => setIsBanModalOpen(false)}
        onConfirm={handleToggleBanConfirm}
        isPending={isBanPending}
        title={seller.user.isActive ? "Блокування мерчанта" : "Розблокування мерчанта"}
        description={
          seller.user.isActive
            ? `Ви впевнені, що хочете заблокувати магазин "${seller.storeName}"? Всі їхні товари будуть приховані з маркетплейсу.`
            : `Розблокувати магазин "${seller.storeName}" та повернути продавцю доступ до кабінету?`
        }
        confirmText={seller.user.isActive ? "Заблокувати" : "Активувати"}
        cancelText="Скасувати"
      />
    </>
  );
}


