import { sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { GAME_MOVES_ENUM, GAME_RESULT_ENUM } from 'src/constants';

export const gameResults = sqliteTable('game_results', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  p1Move: text('p1_move', { enum: GAME_MOVES_ENUM }).default(''),
  p2Move: text('p2_move', { enum: GAME_MOVES_ENUM }).default(''),
  gameAddress: text('game_address').notNull(),
  result: text('result', { enum: GAME_RESULT_ENUM }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const gameAddressIndex = index('game_address_idx').on(gameResults.gameAddress);

export type InsertGameResult = typeof gameResults.$inferInsert;
