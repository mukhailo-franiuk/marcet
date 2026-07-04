import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Оголошуємо масиви захищених маршрутів для кожної ролі
const ADMIN_ROUTES = ['/admin', '/admin/'];
const SELLER_ROUTES = ['/seller', '/seller/'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Крок 1: Отримуємо токен сесії. 
  // Якщо ви використовуєте Auth.js / NextAuth, токен зберігається у цих куках:
  const sessionToken = 
    request.cookies.get('next-auth.session-token')?.value || 
    request.cookies.get('__Secure-next-auth.session-token')?.value || // Для HTTPS/Production
    request.cookies.get('auth_token')?.value; // Для кастомної авторизації, яку ми писали раніше

  // Крок 2: Отримуємо зашифровану роль користувача з кук
  // Під час успішного логіну (у Server Action) ми записуємо роль юзера у куку 'user_role'
  const userRole = request.cookies.get('user_role')?.value;

  // -------------------------------------------------------------
  // ПЕРЕВІРКА ПРАВ ДЛЯ ПАНЕЛІ АДМІНІСТРАТОРА (/admin)
  // -------------------------------------------------------------
  const isTargetingAdmin = ADMIN_ROUTES.some(route => pathname.startsWith(route));

  if (isTargetingAdmin) {
    // Якщо немає токену сесії або роль НЕ є ADMIN — миттєвий редірект на /login
    if (!sessionToken || userRole !== 'ADMIN') {
      const loginUrl = new URL('/login', request.url);
      // Зберігаємо початковий URL, куди хотів потрапити користувач, для редіректу після логіну
      loginUrl.searchParams.set('callbackUrl', pathname); 
      return NextResponse.redirect(loginUrl);
    }
  }

  // -------------------------------------------------------------
  // ПЕРЕВІРКА ПРАВ ДЛЯ ПАНЕЛІ ПРОДАВЦЯ (/seller)
  // -------------------------------------------------------------
  const isTargetingSeller = SELLER_ROUTES.some(route => pathname.startsWith(route));

  if (isTargetingSeller) {
    // Допускаємо лише роль SELLER або ADMIN (адмін може переглядати кабінети)
    if (!sessionToken || (userRole !== 'SELLER' && userRole !== 'ADMIN')) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Якщо всі перевірки пройдені або роут публічний — дозволяємо перехід далі
  return NextResponse.next();
}

// 2. КОНФІГУРАЦІЯ МАТЧЕРА (Захищає лише потрібні роути, оминаючи статику та картинки)
export const config = {
  matcher: [
    /*
     * Перехоплюємо всі шляхи, що починаються з:
     * - admin (панель адміна)
     * - seller (панель продавця)
     */
    '/admin/:path*',
    '/seller/:path*',
  ],
};
