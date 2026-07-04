'use client';

import React from 'react';
import { Trash2, X, Loader2, AlertCircle } from 'lucide-react';

interface DeleteCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  categoryName: string;
  productsCount: number;
  isPending: boolean;
}

export default function DeleteCategoryModal({
  isOpen,
  onClose,
  onConfirm,
  categoryName,
  productsCount,
  isPending,
}: DeleteCategoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Затемнення та розмиття фону */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={isPending ? undefined : onClose}
      />

      {/* Тіло модального вікна */}
      <div className="relative bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-gray-100 z-10 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 font-sans">
        
        {/* Кнопка швидкого закриття (хрестик) */}
        <button
          type="button"
          disabled={isPending}
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          aria-label="Закрити вікно"
        >
          <X size={18} />
        </button>

        {/* Контент-іконка та тексти */}
        <div className="flex flex-col items-center text-center mt-2">
          {/* Декоративне небезпечне червоне коло */}
          <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center border border-rose-100 shadow-sm mb-4 animate-pulse">
            <Trash2 size={26} />
          </div>

          <h3 className="text-xl font-black text-slate-950 tracking-tight leading-snug">
            Видалити категорію?
          </h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-sm">
            Ви дійсно хочете остаточно вилучити категорію <span className="font-bold text-slate-900">«{categoryName}»</span>? Цю дію неможливо буде скасувати.
          </p>
        </div>

        {/* Плашка-попередження про каскадне видалення товарів */}
        <div className="mt-5 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3 text-left">
          <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="flex flex-col space-y-0.5">
            <span className="text-xs font-bold text-amber-900">Увага! Каскадне видалення</span>
            <p className="text-[11px] text-amber-700 leading-relaxed">
              Через зв'язки у базі даних Neon, разом із категорією з каталогу Mercora буде автоматично видалено всі прив'язані до неї товари: <span className="font-bold text-slate-900">{productsCount} шт.</span>
            </p>
          </div>
        </div>

        {/* Управляючі кнопки дій */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            type="button"
            disabled={isPending}
            onClick={onClose}
            className="w-full bg-slate-50 hover:bg-slate-100 border border-gray-200 text-slate-700 font-bold py-3 rounded-xl transition-all text-sm disabled:opacity-50"
          >
            Скасувати
          </button>
          
          <button
            type="button"
            disabled={isPending}
            onClick={onConfirm}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-rose-600/10 hover:shadow-rose-600/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:pointer-events-none"
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Вилучення...</span>
              </>
            ) : (
              <span>Остаточно видалити</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
