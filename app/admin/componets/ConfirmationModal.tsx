'use client';

import React from 'react';
import { AlertTriangle, X, Loader2 } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isPending?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Підтвердити',
  cancelText = 'Скасувати',
  isPending = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop з ефектом замилювання */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={isPending ? undefined : onClose}
      />

      {/* Контейнер модалки */}
      <div className="relative bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-gray-100 z-10 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 font-sans">
        
        {/* Кнопка закриття у верхньому кутку */}
        <button
          type="button"
          disabled={isPending}
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          aria-label="Закрити модальне вікно"
        >
          <X size={18} />
        </button>

        {/* Контент модалки */}
        <div className="flex flex-col items-center text-center mt-2">
          {/* Декоративне коло з іконкою */}
          <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center border border-amber-100 shadow-sm mb-4 animate-bounce">
            <AlertTriangle size={28} />
          </div>

          <h3 className="text-xl font-black text-slate-900 tracking-tight leading-snug">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed max-w-sm">
            {description}
          </p>
        </div>

        {/* Кнопки дій */}
        <div className="grid grid-cols-2 gap-3 mt-8">
          <button
            type="button"
            disabled={isPending}
            onClick={onClose}
            className="w-full bg-slate-50 hover:bg-slate-100 border border-gray-200 text-slate-700 font-bold py-3 rounded-xl transition-all text-sm disabled:opacity-50"
          >
            {cancelText}
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
                <span>Обробка...</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
