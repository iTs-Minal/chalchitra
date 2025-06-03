/*
  Warnings:

  - You are about to drop the column `dislikes` on the `MovieReview` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `MovieReview` table. All the data in the column will be lost.
  - You are about to drop the column `dislikes` on the `ShowReview` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `ShowReview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MovieReview" DROP COLUMN "dislikes",
DROP COLUMN "likes";

-- AlterTable
ALTER TABLE "ShowReview" DROP COLUMN "dislikes",
DROP COLUMN "likes";

-- CreateTable
CREATE TABLE "MovieReviewReaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "isLike" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovieReviewReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShowReviewReaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "isLike" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShowReviewReaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieReviewReaction_userId_reviewId_key" ON "MovieReviewReaction"("userId", "reviewId");

-- CreateIndex
CREATE UNIQUE INDEX "ShowReviewReaction_userId_reviewId_key" ON "ShowReviewReaction"("userId", "reviewId");

-- AddForeignKey
ALTER TABLE "MovieReviewReaction" ADD CONSTRAINT "MovieReviewReaction_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "MovieReview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowReviewReaction" ADD CONSTRAINT "ShowReviewReaction_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "ShowReview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
