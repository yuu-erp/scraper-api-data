import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from './config.type';
@Injectable()
export class ConfigurationService implements ConfigType {
  constructor(private configService: ConfigService<ConfigType, true>) {}

  get port(): number {
    return this.configService.get('port');
  }

  get apiKey(): string {
    return this.configService.get('apiKey');
  }
}
