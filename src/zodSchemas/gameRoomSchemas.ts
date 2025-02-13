import { GAME_MOVES_ENUM, GAME_RESULT_ENUM } from 'src/constants';
import { isAddress } from 'viem';
import * as z from 'zod';

const addressSchema = z.string().refine(isAddress, 'Invalid Address');

export const gameSchema = z.object({
  gameAddress: addressSchema,
});

export const createGameResultSchema = gameSchema.extend({
  gameAddress: addressSchema,
  p1Move: z.enum(GAME_MOVES_ENUM),
  p2Move: z.enum(GAME_MOVES_ENUM),
  result: z.enum(GAME_RESULT_ENUM),
});
