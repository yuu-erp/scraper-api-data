import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { ConfigurationService } from 'src/config/configuration.service';

@Injectable()
export class UploadService {
  private client1 = v2;
  private client2 = v2;
  constructor(private readonly configurationService: ConfigurationService) {
    this.client1.config({
      cloud_name: this.configurationService.cloudinaryName,
      api_key: this.configurationService.cloudinaryApiKey,
      api_secret: this.configurationService.cloudinaryApiSecret,
    });
    this.client2.config({
      cloud_name: this.configurationService.cloudinaryName,
      api_key: this.configurationService.cloudinaryApiKey,
      api_secret: this.configurationService.cloudinaryApiSecret,
    });
  }
  // @ts-ignore
  uploadImage(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const clients = [this.client1, this.client2];
      const randomIndex = Math.floor(Math.random() * clients.length);
      const getClient = clients[randomIndex];
      getClient.uploader
        .upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(file.buffer);
    });
  }
}
