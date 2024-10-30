/*
  Warnings:

  - A unique constraint covering the columns `[mangaId,sourceChapterId]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Chapter_sourceConnectionId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_mangaId_sourceChapterId_key" ON "Chapter"("mangaId", "sourceChapterId");
