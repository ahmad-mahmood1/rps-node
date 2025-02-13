import express from 'express';

const contractRouter = express.Router();

// TODO - Make auto processing api call to fetch the latest successful transaction. Currently assuming the latest call is always successful one.
contractRouter.get('/latest-transaction/:contractAddress', async (req, res) => {
  const { contractAddress } = req.params;

  if (!contractAddress) {
    res.status(400).json({ error: 'contractAddress is required' });
  }

  try {
    const url = `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${contractAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=desc&apikey=${process.env.SEPOLIA_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lastSuccessfulTransaction = () => data.result.find((txn: any) => txn.txreceipt_status === '1');

    res.status(200).json(data.result.length > 0 ? { ...lastSuccessfulTransaction() } : null);
  } catch (error) {
    console.error('Error fetching latest transaction:', error);
    res.status(500).json(error);
  }
});

export default contractRouter;
