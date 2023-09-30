/*
  Warnings:

  - You are about to drop the column `status` on the `GameMatchmakingMember` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GameMatchmakingMember" DROP COLUMN "status",
ADD COLUMN     "isLaunched" BOOLEAN;
