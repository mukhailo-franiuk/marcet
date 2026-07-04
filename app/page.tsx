import { Metadata } from 'next';
import Advantages from "./components/Advantages";
import Hero from "./components/Hero";
import HotDeals from "./components/HotDeals";
import HowItWorks from "./components/HowItWorks";
import PopularProducts from "./components/PopularProducts";

// 1. ПРОСУНУТІ МЕТАДАНІ ДЛЯ ГОЛОВНОЇ СТОРІНКИ
export const metadata: Metadata = {
  title: 'Mercora — Маркетплейс нового покоління | Купити товари в Україні',
  description: 'Інноваційний маркетплейс Mercora: мільйони товарів від перевірених брендів та продавців. Швидка доставка по Україні, безпечна оплата, кешбек та акції на електроніку, моду, товари для дому.',
  keywords: ['маркетплейс', 'інтернет магазин', 'купити товари україна', 'акції', 'знижки', 'електроніка', 'mercora'],
  alternates: {
    canonical: 'https://mercora.com',
    languages: {
      'uk-UA': 'https://mercora.com',
      'en-US': 'https://mercora.com',
    },
  },
  openGraph: {
    title: 'Mercora — Маркетплейс нового покоління',
    description: 'Купуйте розумно та безпечно! Мільйони товарів із надшвидкою доставкою в один клік на Mercora.',
    url: 'https://mercora.com',
    images: [
      {
        url: '/images/og-main-banner-1200x630.jpg',
        width: 1200,
        height: 630,
        alt: 'Mercora Marketplace — Горизонтальний банер',
      },
      {
        url: '/images/og-main-square-600x600.jpg',
        width: 600,
        height: 600,
        alt: 'Mercora Marketplace — Квадратне прев’ю для месенджерів',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mercora_market',
    title: 'Mercora — Маркетплейс нового покоління',
    description: 'Інноваційний онлайн-шопінг в Україні. Безпечні угоди, акції та перевірені продавці.',
    images: ['/images/og-main-banner-1200x630.jpg'],
  },
};

export default function Home() {
  // 2. МАСИВ МІКРОРОЗМІТКИ JSON-LD ДЛЯ GOOGLE
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'OnlineStore',
      '@id': 'https://mercora.com',
      'name': 'Mercora',
      'url': 'https://mercora.com',
      'logo': 'https://mercora.com',
      'description': 'Сучасний маркетплейс нового покоління в Україні з широким асортиментом товарів.',
      'image': 'https://mercora.com',
      'priceRange': 'UAH',
      'sameAs': [
        'https://facebook.com',
        'https://instagram.com',
        'https://youtube.com'
      ],
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://mercora.com{search_term_string}',
        'query-input': 'required name=search_term_string'
      },
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'UA',
        'addressRegion': 'Київська область',
        'addressLocality': 'Київ'
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '0-800-123-456',
        'contactType': 'customer service',
        'availableLanguage': ['Ukrainian']
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Головна',
          'item': 'https://mercora.com'
        }
      ]
    }
  ];

  return (
    <div>
      {/* Вбудовування просунутої Schema-розмітки */}
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Ваші секції сторінки в оригінальному порядку */}
      <Hero />
      <HotDeals />
      <PopularProducts />
      <Advantages />
      <HowItWorks />
    </div>
  );
}
