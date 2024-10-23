import { Module } from '@nestjs/common';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';
import { ConfigurationModule } from 'src/config/configuration.module';
@Module({
  imports: [ConfigurationModule],
  controllers: [ScraperController],
  providers: [ScraperService],
  exports: [],
})
export class ScraperModule {}
