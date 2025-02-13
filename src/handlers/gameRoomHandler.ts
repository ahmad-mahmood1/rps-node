import { eq } from 'drizzle-orm';
import { db } from 'src/db/client';
import { GameRoom, gameRooms, InsertGameRoom } from 'src/db/schema';

export const insertGame = async (data: InsertGameRoom) => {
  const newGame = await db.insert(gameRooms).values(data);

  return newGame;
};

export const updateGame = async (data: Partial<GameRoom>) => {
  if (data.id) {
    const { id, ...rest } = data;
    const updatedGame = await db.update(gameRooms).set(rest).where(eq(gameRooms.id, id));

    return updatedGame;
  }

  throw new Error('Game id is missing');
};
