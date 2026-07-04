import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// 🔥 Явно завантажуємо змінні оточення з файлу .env для Prisma CLI
dotenv.config();

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Тепер process.env гарантовано міститиме ваші рядки підключення Neon
    url: process.env.DIRECT_URL || process.env.DATABASE_URL,
  },
});


