import { Global, Module } from '@nestjs/common';
import { ConfigurationModule } from '../../config/configuration.module';
import { UpdateService } from './update.service';

@Global()
@Module({
  imports: [ConfigurationModule],
  controllers: [],
  providers: [UpdateService],
  exports: [UpdateService],
})
export class UpdateModule {}
