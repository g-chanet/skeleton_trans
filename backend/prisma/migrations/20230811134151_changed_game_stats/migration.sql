/*
  Warnings:

  - Added the required column `isWinner` to the `GameStat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opponentId` to the `GameStat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opponentScore` to the `GameStat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userScore` to the `GameStat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameStat" ADD COLUMN     "isWinner" BOOLEAN NOT NULL,
ADD COLUMN     "opponentId" TEXT NOT NULL,
ADD COLUMN     "opponentScore" TEXT NOT NULL,
ADD COLUMN     "userScore" TEXT NOT NULL;
