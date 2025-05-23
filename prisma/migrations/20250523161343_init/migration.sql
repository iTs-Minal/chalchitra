-- CreateEnum
CREATE TYPE "MovieStatus" AS ENUM ('FAVORITE', 'WATCHLIST', 'WATCHED');

-- CreateTable
CREATE TABLE "UserMovieDate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "status" "MovieStatus" NOT NULL,
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMovieDate_pkey" PRIMARY KEY ("id")
);
