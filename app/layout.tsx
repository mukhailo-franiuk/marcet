import { Metadata, Viewport } from 'next';
import { Comfortaa } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: '#7c3aed', // Фіолетовий бренд-колір Mercora для мобільних браузерів (Chrome/Safari)
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};
export const metadata: Metadata = {
  metadataBase: new URL('https://mercora.com'),
  title: {
    template: '%s | Mercora Marketplace',
    default: 'Mercora — Маркетплейс нового покоління',
  },
  description: 'Інноваційний маркетплейс Mercora: мільйони товарів із надшвидкою доставкою, безпечною оплатою та акціями.',
  
  // Просунуті налаштування верифікації для відомих пошукових консолей
  verification: {
    google: 'google-site-verification-code-here',
    yandex: 'yandex-verification-code-here',
  },

  // Якщо потрібен кастомний верифікаційний тег — передаємо його сюди (Next.js згенерує <meta name="meetonpage" content="..." />)
  other: {
    meetonpage: 'custom-verification',
  },

  // Керування автоматичним визначенням форматів пристроями
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Налаштування для iOS Safari
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mercora',
  },

  // Глобальні OpenGraph параметри
  openGraph: {
    siteName: 'Mercora',
    locale: 'uk_UA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${comfortaa.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
