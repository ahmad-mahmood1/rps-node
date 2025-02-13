import { sql } from 'drizzle-orm';
import { index, int, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const gameRooms = sqliteTable('game_rooms', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  p1Address: text('p1_address').notNull(),
  p2Address: text('p2_address').notNull(),
  gameAddress: text('game_address').notNull(),
  initialStake: int('initial_stake').default(0).notNull(),
  p1Timeout: integer('p1_timeout', { mode: 'boolean' }).default(false).notNull(),
  p2Timeout: integer('p2_timeout', { mode: 'boolean' }).default(false).notNull(),
  result: text('result', { enum: ['p1_won', 'p2_won', 'tie', 'pending_p1', 'pending_p2', 'timed_out'] })
    .default('pending_p2')
    .notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const p1AddressIndex = index('player_address_idx').on(gameRooms.p1Address);
export const p2AddressIndex = index('player_address_idx').on(gameRooms.p2Address);
export const gameAddressIndex = index('game_address_idx').on(gameRooms.gameAddress);

export type InsertGameRoom = typeof gameRooms.$inferInsert;
export type GameRoom = typeof gameRooms.$inferSelect;
