import { Module } from '@nestjs/common';
import { ScraperModule } from './modules/scraper/scraper.module';
import { MangaModule } from './modules/manga/manga.module';
import { PrismaModule } from './service/prismaService/prisma.module';
import { ImageModule } from './modules/image/image.module';

@Module({
  imports: [ScraperModule, MangaModule, PrismaModule, ImageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
