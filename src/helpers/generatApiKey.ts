import { createHmac, randomBytes } from 'crypto';

export function generateHmacApiKey(secret: string, data: string): string {
  return createHmac('sha256', secret).update(data).digest('hex');
}
export function generateSecret() {
  return randomBytes(32).toString('hex');
}
