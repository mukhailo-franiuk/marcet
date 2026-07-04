'use client';

import React, { useState, useTransition } from 'react';
import { createCategory, updateCategory, deleteCategory } from '@/app/actions/adminCategories';
import EditCategoryModal from './EditCategoryModal';
import DeleteCategoryModal from './DeleteCategoryModal';
import { FolderPlus, Loader2, Tag, Layers, Edit2, Trash2 } from 'lucide-react';

interface CategoryManagerProps {
  initialCategories: {
    id: string;
    name: string;
    slug: string;
    _count: {
      products: number;
    };
  }[];
}

export default function CategoryManager({ initialCategories }: CategoryManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Стани для відкриття модальних вікон модерації
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; name: string; productsCount: number } | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Створення нової категорії (Ваш оригінальний метод)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const categoryName = formData.get('categoryName') as string;

    startTransition(async () => {
      const res = await createCategory(categoryName);
      if (res?.error) {
        setError(res.error);
      } else if (res?.success) {
        setSuccess(res.success);
        (e.target as HTMLFormElement).reset();
      }
    });
  };

  // 🔥 НОВИЙ МЕТОД: Підтвердження збереження відредагованої назви
  const handleUpdateConfirm = (newName: string) => {
    if (!selectedCategory) return;
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const res = await updateCategory(selectedCategory.id, newName);
      if (res?.error) {
        alert(res.error);
      } else {
        setIsEditOpen(false);
        setSelectedCategory(null);
      }
    });
  };

  // 🔥 НОВИЙ МЕТОД: Підтвердження каскадного вилучення категорії
  const handleDeleteConfirm = () => {
    if (!selectedCategory) return;
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const res = await deleteCategory(selectedCategory.id);
      if (res?.error) {
        alert(res.error);
      } else {
        setIsDeleteOpen(false);
        setSelectedCategory(null);
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      
      {/* 1. ФОРМА СТВОРЕННЯ КАТЕГОРІЇ */}
      <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-xl shadow-slate-100/40 h-fit">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-violet-50 text-violet-600 rounded-lg flex items-center justify-center">
            <FolderPlus size={18} />
          </div>
          <h3 className="font-black text-slate-950 tracking-tight text-base">Створити категорію</h3>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs rounded-xl font-medium mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs rounded-xl font-medium mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Назва категорії українською</label>
            <input 
              name="categoryName" 
              type="text" 
              required 
              disabled={isPending}
              placeholder="Наприклад: Побутова техніка" 
              className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:border-violet-500 text-slate-800 disabled:opacity-60"
            />
            <p className="text-[10px] text-gray-400 leading-tight pt-1">
              URL-слаг згенерується автоматично (наприклад: <span className="font-mono">pobutova-tekhnika</span>).
            </p>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70"
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Збереження...</span>
              </>
            ) : (
              <span>Додати категорію</span>
            )}
          </button>
        </form>
      </div>

      {/* 2. СЕКЦІЯ РЕЄСТРУ ТА СТАТИСТИКИ КАТЕГОРІЙ */}
      <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl shadow-xl shadow-slate-100/40 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-gray-400" />
            <h3 className="font-bold text-slate-900 text-base">Активні категорії структури</h3>
          </div>
          <span className="bg-slate-50 border text-slate-600 text-xs px-2.5 py-1 rounded-full font-bold">
            Всього: {initialCategories.length}
          </span>
        </div>

        <div className="divide-y divide-gray-100 max-h-[450px] overflow-y-auto no-scrollbar">
          {initialCategories.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">Структура категорій наразі пуста.</div>
          ) : (
            initialCategories.map((cat) => (
              <div key={cat.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50/50 transition-all group">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 text-sm">{cat.name}</span>
                  <span className="text-xs font-mono text-gray-400 flex items-center gap-1 mt-0.5">
                    <Tag size={12} /> {cat.slug}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="bg-violet-50 text-violet-700 text-xs px-2.5 py-1 rounded-lg font-bold">
                    {cat._count.products} товарів
                  </span>
                  
                  {/* 🔥 НОВИЙ БЛОК: Кнопки дій управління категорією (з'являються при наведенні курсору) */}
                  <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => {
                        setSelectedCategory({ id: cat.id, name: cat.name, productsCount: cat._count.products });
                        setIsEditOpen(true);
                      }}
                      className="p-1.5 hover:bg-gray-100 rounded-lg text-slate-500 hover:text-violet-600 transition-colors disabled:opacity-50"
                      title="Редагувати категорію"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => {
                        setSelectedCategory({ id: cat.id, name: cat.name, productsCount: cat._count.products });
                        setIsDeleteOpen(true);
                      }}
                      className="p-1.5 hover:bg-gray-100 rounded-lg text-slate-500 hover:text-rose-600 transition-colors disabled:opacity-50"
                      title="Видалити категорію"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. СУЧАСНІ ПРЕМІАЛЬНІ МОДАЛЬНІ ВІКНА КЕРУВАННЯ */}
      {/* ========================================================================= */}
      
      {/* Модалка інлайн-редагування назви */}
      <EditCategoryModal 
        isOpen={isEditOpen}
        onClose={() => { setIsEditOpen(false); setSelectedCategory(null); }}
        onConfirm={handleUpdateConfirm}
        currentName={selectedCategory?.name || ''}
        isPending={isPending}
      />

      {/* Професійна деструктивна модалка каскадного видалення */}
      <DeleteCategoryModal 
        isOpen={isDeleteOpen}
        onClose={() => { setIsDeleteOpen(false); setSelectedCategory(null); }}
        onConfirm={handleDeleteConfirm}
        categoryName={selectedCategory?.name || ''}
        productsCount={selectedCategory?.productsCount || 0}
        isPending={isPending}
      />

    </div>
  );
}

