import dotenv from 'dotenv';
dotenv.config();

export const config = {
  turso: {
    databaseUrl: process.env.TURSO_DATABASE_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
} as const;
