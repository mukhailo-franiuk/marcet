'use client';

import React, { useState, useTransition } from 'react';
import { createAdminProduct } from '@/app/actions/adminProducts';
import { Plus, X, Loader2, Upload, FileImage } from 'lucide-react';

interface AddProductFormProps {
  categories: { id: string; name: string }[];
}

export default function AddProductForm({ categories }: AddProductFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // Ліміт 4MB для збереження в базу
        alert("Файл занадто великий! Оберіть зображення до 4 МБ.");
        e.target.value = '';
        setFileName(null);
        return;
      }
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await createAdminProduct(formData);
      if (res?.error) {
        setError(res.error);
      } else {
        setIsOpen(false);
        setFileName(null);
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-bold px-5 py-3 rounded-xl shadow-lg transition-all text-sm w-full sm:w-auto justify-center"
      >
        <Plus size={18} /> Додати новий товар
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end font-sans">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => !isPending && setIsOpen(false)} />
          
          <div className="relative bg-white w-full max-w-md h-full shadow-2xl p-6 flex flex-col z-10 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between border-b pb-4 shrink-0">
              <h3 className="text-lg font-black text-slate-950 tracking-tight">Нова позиція (BLOB)</h3>
              <button type="button" onClick={() => setIsOpen(false)} disabled={isPending} className="p-2 text-gray-400 hover:text-slate-900 rounded-xl"><X size={18} /></button>
            </div>

            {/* Форма обов’язково БЕЗ атрибуту action, обробляється через onSubmit */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 no-scrollbar">
              {error && <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs rounded-xl">{error}</div>}

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Назва товару *</label>
                <input name="title" type="text" required placeholder="Наприклад: Навушники Pro" className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-violet-500 text-slate-800" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Категорія *</label>
                <select name="categoryId" required className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-violet-500 text-slate-800">
                  <option value="">Оберіть категорію</option>
                  {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>

              {/* 🔥 ПОЛЕ ЗАВАНТАЖЕННЯ ФАЙЛУ КАРТИНКИ (BLOB) */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Зображення товару *</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-2xl cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors p-4 text-center">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {fileName ? (
                        <>
                          <FileImage size={24} className="text-violet-500 mb-2" />
                          <p className="text-xs font-semibold text-slate-800 truncate max-w-[250px]">{fileName}</p>
                        </>
                      ) : (
                        <>
                          <Upload size={24} className="text-gray-400 mb-2" />
                          <p className="text-xs text-gray-500"><span className="font-bold text-violet-600">Натисніть</span> або перетягніть</p>
                          <p className="text-[10px] text-gray-400 mt-1">PNG, JPG або WEBP (макс. 4MB)</p>
                        </>
                      )}
                    </div>
                    <input 
                      name="image" 
                      type="file" 
                      accept="image/*" 
                      required 
                      onChange={handleFileChange}
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Поточна ціна (₴) *</label>
                  <input name="price" type="number" step="0.01" required className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-violet-500 text-slate-800" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Стара ціна (₴)</label>
                  <input name="oldPrice" type="number" step="0.01" className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-violet-500 text-slate-800" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Залишок на складі *</label>
                  <input name="totalCount" type="number" required defaultValue="10" className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-violet-500 text-slate-800" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Тип пропозиції</label>
                  <select name="isHot" className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-violet-500 text-slate-800">
                    <option value="false">Звичайний товар</option>
                    <option value="true">🔥 Гаряча пропозиція</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Опис товару *</label>
                <textarea name="description" rows={3} required placeholder="Опис..." className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-violet-500 text-slate-800 resize-none" />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70"
              >
                {isPending ? <Loader2 size={16} className="animate-spin" /> : <span>Опублікувати товар</span>}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
