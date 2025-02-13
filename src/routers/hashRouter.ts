import express from 'express';
import { hasherContract } from 'src/contract/hasher';
import { generateRandomSalt } from 'src/utils';
import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

const hashRouter = express.Router();

hashRouter.post('/generate', async (req, res) => {
  try {
    const { move } = req.body;

    if (!move) {
      res.status(400).json({ error: 'move parameter is required' });
    }

    const salt = generateRandomSalt();

    const hashResult = await publicClient.readContract({
      address: '0x9f9D2d7DB7eF028d296a5CCDFE4bcb7E200101d3',
      abi: hasherContract.abi,
      functionName: 'hash',
      args: [move, salt],
    });

    res.status(200).json({ hashedMove: hashResult, salt });
  } catch (error) {
    console.error('Error reading from contract:', error);
    res.status(500).json({ error: 'Failed to read from contract' });
  }
});

export default hashRouter;
