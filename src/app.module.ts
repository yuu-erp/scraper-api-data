import { Module } from '@nestjs/common';
import { ScraperModule } from './modules/scraper/scraper.module';
import { MangaModule } from './modules/manga/manga.module';
import { PrismaModule } from './service/prismaService/prisma.module';
import { ChapterModule } from './modules/chapter/chapter.module';
import { UpdateModule } from './service/updateService/update.module';

@Module({
  imports: [
    ScraperModule,
    MangaModule,
    PrismaModule,
    ChapterModule,
    UpdateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
