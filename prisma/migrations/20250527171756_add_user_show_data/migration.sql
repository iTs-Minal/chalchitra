-- CreateEnum
CREATE TYPE "ShowStatus" AS ENUM ('FAVORITE', 'WATCHLIST', 'WATCHED');

-- CreateTable
CREATE TABLE "UserShowData" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tmdbId" INTEGER NOT NULL,
    "status" "ShowStatus" NOT NULL,
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserShowData_pkey" PRIMARY KEY ("id")
);
