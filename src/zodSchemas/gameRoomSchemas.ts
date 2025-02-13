import { isAddress } from 'viem';
import * as z from 'zod';

const addressSchema = z.string().refine(isAddress, 'Invalid Address');

export const createGameSchema = z.object({
  p1Address: addressSchema,
  p2Address: addressSchema,
  gameAddress: addressSchema,
  initialStake: z.number().refine((val) => val > 0, 'Invalid stake amount'),
});

export const updateGameSchema = z.object({
  p1Address: addressSchema.optional(),
  p2Address: addressSchema.optional(),
  gameAddress: addressSchema.optional(),
  p1Timeout: z.boolean().optional(),
  p2Timeout: z.boolean().optional(),
  result: z.enum(['p1_won', 'p2_won', 'tie', 'pending_p1', 'pending_p2', 'timed_out']).optional(),
});

export const playerSchema = z.object({
  playerAddress: addressSchema,
});

export const gameSchema = z.object({
  gameAddress: addressSchema,
});
