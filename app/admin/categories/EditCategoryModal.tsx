'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2, FolderEdit } from 'lucide-react';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newName: string) => void;
  currentName: string;
  isPending: boolean;
}

export default function EditCategoryModal({
  isOpen,
  onClose,
  onConfirm,
  currentName,
  isPending,
}: EditCategoryModalProps) {
  const [name, setName] = useState(currentName);

  // Синхронізуємо локальний стан форми, коли відкривається модалка для конкретної категорії
  useEffect(() => {
    setName(currentName);
  }, [currentName, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      alert("Назва категорії має містити мінімум 2 символи.");
      return;
    }
    onConfirm(name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop (Темне напівпрозоре розмите тло) */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={isPending ? undefined : onClose}
      />
      
      {/* Контейнер модального вікна */}
      <div className="relative bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-gray-100 z-10 transform transition-all animate-in fade-in zoom-in-95 duration-200 font-sans">
        
        {/* Кнопка закриття (хрестик) */}
        <button 
          type="button" 
          disabled={isPending} 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-slate-900 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50"
          aria-label="Закрити вікно"
        >
          <X size={18} />
        </button>

        {/* Шапка модалки */}
        <div className="flex flex-col items-center text-center mt-2">
          <div className="w-12 h-12 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center border border-violet-100 shadow-sm mb-4">
            <FolderEdit size={22} />
          </div>
          <h3 className="text-xl font-black text-slate-950 tracking-tight">Редагувати категорію</h3>
          <p className="text-xs text-gray-400 mt-1 max-w-xs">
            Зміна назви автоматично перерахує SEO-оптимізований URL-слаг у базі даних.
          </p>
        </div>

        {/* Форма редагування */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Назва категорії українською</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required 
              disabled={isPending}
              placeholder="Введіть нову назву..."
              className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-violet-500 text-slate-800 disabled:opacity-60 transition-all"
            />
          </div>

          {/* Кнопки дій */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <button 
              type="button" 
              disabled={isPending} 
              onClick={onClose} 
              className="bg-slate-50 hover:bg-slate-100 border border-gray-200 text-slate-700 font-bold py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
            >
              Скасувати
            </button>
            <button 
              type="submit" 
              disabled={isPending || name.trim() === currentName} 
              className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-600/10 hover:shadow-violet-600/20 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Оновлення...</span>
                </>
              ) : (
                <span>Зберегти зміни</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
