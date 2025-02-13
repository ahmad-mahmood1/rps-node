import { eq } from 'drizzle-orm';
import express from 'express';
import { db } from 'src/db/client';
import { gameResults, InsertGameResult } from 'src/db/schema';
import { createGameResultSchema, gameSchema } from 'src/zodSchemas/gameRoomSchemas';
import { validateRequest } from 'zod-express-middleware'; // Replace with the correct import

const gameResultsRouter = express.Router();

gameResultsRouter.get(
  '/:gameAddress',
  validateRequest({
    params: gameSchema,
  }),
  async (req, res) => {
    try {
      const { gameAddress } = req.params;
      const gameResult = await db.query.gameResults.findFirst({ where: eq(gameResults.gameAddress, gameAddress) });
      res.status(200).json(gameResult ?? null);
    } catch (e) {
      res.status(500).json({ error: e instanceof Error ? e.message : 'An error occurred' });
    }
  },
);

gameResultsRouter.post(
  '/create',
  validateRequest({
    body: createGameResultSchema,
  }),
  async (req, res) => {
    try {
      const body = req.body as InsertGameResult;
      const newGameRoom = await db.insert(gameResults).values(body).returning();
      res.status(201).json(newGameRoom[0]);
    } catch (e) {
      res.status(400).json({ error: e instanceof Error ? e.message : 'An error occurred' });
    }
  },
);

export default gameResultsRouter;
