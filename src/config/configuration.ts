import { ConfigType } from './config.type';

export const configuration = (): ConfigType => ({
  port: Number(process.env.PORT) || 3001,
  apiKey: process.env.X_API_KEY || '',
});
