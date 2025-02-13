import { Server, Socket } from 'socket.io';
import { InsertGameRoom } from 'src/db/schema';
import { insertGame, updateGame } from 'src/handlers/gameRoomHandler';
import { EVENTS } from './events';

export const gameRoomEvents = (socket: Socket, ioServer: Server) => {
  socket.on(EVENTS.JOIN_GAME, (data) => {
    socket.join(data.gameAddress);
    socket.to(data.gameAddress).emit(EVENTS.PLAYER_JOINED, { message: data.message });
  });

  socket.on(EVENTS.CREATE_GAME, async (newGameData: InsertGameRoom, cb) => {
    console.log('Game Data:', newGameData);
    try {
      const newGame = await insertGame(newGameData);
      console.log('Created new game:', newGame);

      ioServer.emit(EVENTS.GAME_CREATED);
      cb({ status: 'ok' });
    } catch (e) {
      console.log('Error creating new game', e);
    }
  });

  socket.on(EVENTS.UPDATE_GAME, async (newGameData: InsertGameRoom, cb) => {
    try {
      await updateGame(newGameData);
      ioServer.in(newGameData.gameAddress).emit(EVENTS.GAME_UPDATED, newGameData.gameAddress);
      cb?.({ status: 'ok' });
    } catch (e) {
      console.log('Error updating game', e);
    }
  });
};
