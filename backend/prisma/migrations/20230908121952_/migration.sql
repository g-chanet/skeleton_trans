/*
  Warnings:

  - You are about to drop the column `isPublic` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "isPublic",
ADD COLUMN     "targetUserId" TEXT;
