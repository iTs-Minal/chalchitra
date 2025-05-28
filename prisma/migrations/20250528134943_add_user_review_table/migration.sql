/*
  Warnings:

  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Review";

-- CreateTable
CREATE TABLE "UserReview" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "dislikes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserReview_userId_tmdbId_key" ON "UserReview"("userId", "tmdbId");
