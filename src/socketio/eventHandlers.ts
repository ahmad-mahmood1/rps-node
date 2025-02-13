import { Server, Socket } from 'socket.io';
import { EVENTS } from './events';
import { gameResults, InsertGameResult } from 'src/db/schema';
import { db } from 'src/db/client';

export const gameRoomEvents = (socket: Socket, ioServer: Server) => {
  socket.on(EVENTS.PLAYER_JOINED, (data) => {
    socket.join(data.gameAddress);
    socket.to(data.gameAddress).emit(EVENTS.PLAYER_JOINED, { message: data.message });
  });

  socket.on(EVENTS.UPDATE_GAME, (gameAddress: string) => {
    ioServer.in(gameAddress).emit(EVENTS.GAME_UPDATED);
  });

  socket.on(EVENTS.CREATE_GAME_RESULT, async (gameResult: InsertGameResult) => {
    await db.insert(gameResults).values(gameResult);
    ioServer.in(gameResult.gameAddress).emit(EVENTS.GAME_UPDATED);
  });
};
