/*
  Warnings:

  - You are about to drop the column `discordId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `githubId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `googleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `school42Id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "discordId",
DROP COLUMN "githubId",
DROP COLUMN "googleId",
DROP COLUMN "school42Id",
ADD COLUMN     "isOauth" BOOLEAN,
ADD COLUMN     "providerId" TEXT,
ADD COLUMN     "providerName" TEXT;
