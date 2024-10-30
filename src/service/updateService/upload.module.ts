import { Global, Module } from '@nestjs/common';
import { ConfigurationModule } from '../../config/configuration.module';
import { UploadService } from './upload.service';

@Global()
@Module({
  imports: [ConfigurationModule],
  controllers: [],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
