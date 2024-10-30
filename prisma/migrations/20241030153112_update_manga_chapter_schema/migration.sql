/*
  Warnings:

  - The primary key for the `Manga` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `sourceId` on table `Chapter` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_mangaId_fkey";

-- DropIndex
DROP INDEX "Manga_sourceId_key";

-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "sourceId" SET NOT NULL,
ALTER COLUMN "mangaId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Manga" DROP CONSTRAINT "Manga_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Manga_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Manga_id_seq";

-- CreateIndex
CREATE INDEX "Chapter_sourceConnectionId_idx" ON "Chapter"("sourceConnectionId");

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_mangaId_fkey" FOREIGN KEY ("mangaId") REFERENCES "Manga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
