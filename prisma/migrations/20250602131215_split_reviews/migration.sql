/*
  Warnings:

  - You are about to drop the `UserReview` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "UserMovieData" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "UserShowData" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "UserReview";

-- CreateTable
CREATE TABLE "MovieReview" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "content" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "dislikes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MovieReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShowReview" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "content" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "dislikes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShowReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieReview_userId_tmdbId_key" ON "MovieReview"("userId", "tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "ShowReview_userId_tmdbId_key" ON "ShowReview"("userId", "tmdbId");
