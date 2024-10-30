import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigurationService } from 'src/config/configuration.service';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UpdateService {
  constructor(private readonly configurationService: ConfigurationService) {
    cloudinary.config({
      cloud_name: this.configurationService.cloudinaryName,
      api_key: this.configurationService.cloudinaryApiKey,
      api_secret: this.configurationService.cloudinaryApiSecret,
    });
  }
  // @ts-ignore
  uploadImage(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(file.buffer);
    });
  }
}
