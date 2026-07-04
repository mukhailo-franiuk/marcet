import { PrismaClient } from '@prisma/client';
import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

// Налаштовуємо веб-сокети для роботи Neon у середовищі Node.js
neonConfig.webSocketConstructor = ws;

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is missing.');
  }

  // 🔥 Передаємо об'єкт конфігурації з connectionString НАПРЯМУ в PrismaNeon,
  // оминаючи створення проміжного класу Pool. Це прибирає помилку TypeScript.
  const adapter = new PrismaNeon({ connectionString });

  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
