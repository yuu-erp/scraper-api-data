import { Module } from '@nestjs/common';
import { ScraperModule } from './modules/scraper/scraper.module';
import { MangaModule } from './modules/manga/manga.module';
import { PrismaModule } from './service/prismaService/prisma.module';
import { ChapterModule } from './modules/chapter/chapter.module';
import { UploadModule } from './service/updateService/upload.module';
import { AnilistModule } from './service/anilistService/anilist.module';

@Module({
  imports: [
    ScraperModule,
    MangaModule,
    PrismaModule,
    ChapterModule,
    UploadModule,
    AnilistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
