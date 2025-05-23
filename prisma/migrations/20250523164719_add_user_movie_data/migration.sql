/*
  Warnings:

  - You are about to drop the `UserMovieDate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UserMovieDate";

-- CreateTable
CREATE TABLE "UserMovieData" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "status" "MovieStatus" NOT NULL,
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMovieData_pkey" PRIMARY KEY ("id")
);
