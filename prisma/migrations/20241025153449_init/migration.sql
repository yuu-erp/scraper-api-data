/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Manga" (
    "id" SERIAL NOT NULL,
    "sourceId" TEXT NOT NULL,
    "sourceMediaId" TEXT,
    "sourceConnectionId" TEXT,
    "anilistId" INTEGER,

    CONSTRAINT "Manga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sourceConnectionId" TEXT NOT NULL,
    "sourceMediaId" TEXT,
    "sourceChapterId" TEXT,
    "sourceId" TEXT,
    "slug" TEXT NOT NULL,
    "mangaId" INTEGER NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Manga_sourceId_key" ON "Manga"("sourceId");

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
