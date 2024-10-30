import { ConfigType } from './config.type';

export const configuration = (): ConfigType => ({
  port: Number(process.env.PORT) || 3001,
  apiKey: process.env.X_API_KEY || '',
  cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME || '',
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || '',
  cloudinaryApiSecret: process.env.CLOUDINARY_API_KEY || '',
});
