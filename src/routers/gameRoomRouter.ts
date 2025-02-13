import { and, eq, or } from 'drizzle-orm';
import express from 'express';
import { db } from 'src/db/client';
import { gameRooms, InsertGameRoom } from 'src/db/schema';
import { createGameSchema, gameSchema, playerSchema, updateGameSchema } from 'src/zodSchemas/gameRoomSchemas';
import { validateRequest } from 'zod-express-middleware'; // Replace with the correct import

const app = express.Router();

// Get a specific game room by gameAddress
app.get(
  '/:gameAddress',
  validateRequest({
    params: gameSchema,
  }),
  async (req, res) => {
    try {
      const { gameAddress } = req.params;
      const gameRoom = await db.query.gameRooms.findFirst({ where: eq(gameRooms.gameAddress, gameAddress) });
      res.status(200).json(gameRoom ?? null);
    } catch (e) {
      res.status(500).json({ error: e instanceof Error ? e.message : 'An error occurred' });
    }
  },
);

// Find a player's game by playerAddress
app.get(
  '/find-player-game/:playerAddress',
  validateRequest({
    params: playerSchema,
  }),
  async (req, res) => {
    try {
      const { playerAddress } = req.params;

      const playerGame = await db.query.gameRooms.findFirst({
        where: and(
          or(eq(gameRooms.p1Address, playerAddress), eq(gameRooms.p2Address, playerAddress)),
          or(eq(gameRooms.result, 'pending_p1'), eq(gameRooms.result, 'pending_p2')),
        ),
      });
      res.status(200).json(playerGame ?? null);
    } catch (e) {
      res.status(500).json({ error: e instanceof Error ? e.message : 'An error occurred' });
    }
  },
);

// Create a new game room
app.post(
  '/create',
  validateRequest({
    body: createGameSchema,
  }),
  async (req, res) => {
    try {
      const body = req.body as InsertGameRoom;
      console.log('===  body:', body);
      const newGameRoom = await db.insert(gameRooms).values(body).returning();
      res.status(201).json(newGameRoom[0]);
    } catch (e) {
      res.status(400).json({ error: e instanceof Error ? e.message : 'An error occurred' });
    }
  },
);

// Update a game room by id
app.put(
  '/update/:id',
  validateRequest({
    body: updateGameSchema,
  }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const updatedGameRoom = await db.update(gameRooms).set(body).where(eq(gameRooms.id, id)).returning();

      if (updatedGameRoom.length === 0) {
        res.status(404).json({ error: 'Game room not found' });
      }

      res.status(200).json(updatedGameRoom[0]);
    } catch (e) {
      res.status(400).json({ error: e instanceof Error ? e.message : 'An error occurred' });
    }
  },
);

export default app;
