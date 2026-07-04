import { defineConfig } from '@prisma/config';

export default defineConfig({
  // 🔥 Передаємо шлях до схеми як звичайний рядок. Це виправляє помилку TypeScript.
  schema: 'prisma/schema.prisma',
  
  // Переносимо підключення для міграцій CLI та Prisma Studio
  datasource: {
    url: process.env.DIRECT_URL || process.env.DATABASE_URL,
  },
});

