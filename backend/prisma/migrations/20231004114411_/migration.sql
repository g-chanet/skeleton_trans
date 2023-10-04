/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `GameMatchmakingMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GameMatchmakingMember_userId_key" ON "GameMatchmakingMember"("userId");
