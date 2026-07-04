import { ImageResponse } from 'next/og';

// 1. Конфігурація розміру іконки (стандарт для сучасних браузерів та пристроїв)
export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

// 2. Генератор зображення
export default function Icon() {
  return new ImageResponse(
    (
      // Створюємо квадратний контейнер з фірмовим градієнтом і заокругленням
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to top right, #7c3aed, #d946ef)', // Градієнт violet-600 -> fuchsia-500
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(124, 58, 237, 0.2)',
        }}
      >
        {/* Стилізована літера M по центру */}
        <span
          style={{
            fontSize: '20px',
            fontWeight: 900,
            color: 'white',
            fontStyle: 'italic',
            fontFamily: 'sans-serif',
            transform: 'translateY(-0.5px)',
          }}
        >
          M
        </span>
      </div>
    ),
    // Передаємо налаштування розміру
    {
      ...size,
    }
  );
}
