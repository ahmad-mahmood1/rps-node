import { randomBytes } from 'node:crypto';
import { toHex } from 'viem/utils';

export function generateRandomSalt() {
  const randomNumber = randomBytes(32);
  const salt = toHex(randomNumber);
  return salt;
}
