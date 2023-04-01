/*
  Warnings:

  - The values [Pulbic] on the enum `EChannelType` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `GameMatchmakingMember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `GameMatchmakingMember` table. All the data in the column will be lost.
  - Made the column `userId` on table `ChannelMessage` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `GameMatchmakingMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EChannelType_new" AS ENUM ('Public', 'Protected', 'Private');
ALTER TABLE "Channel" ALTER COLUMN "channelType" TYPE "EChannelType_new" USING ("channelType"::text::"EChannelType_new");
ALTER TYPE "EChannelType" RENAME TO "EChannelType_old";
ALTER TYPE "EChannelType_new" RENAME TO "EChannelType";
DROP TYPE "EChannelType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "ChannelMessage" DROP CONSTRAINT "ChannelMessage_userId_fkey";

-- DropForeignKey
ALTER TABLE "GameMatchmakingMember" DROP CONSTRAINT "GameMatchmakingMember_id_fkey";

-- DropForeignKey
ALTER TABLE "UserPresence" DROP CONSTRAINT "UserPresence_userId_fkey";

-- AlterTable
ALTER TABLE "ChannelMessage" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "GameMatchmakingMember" DROP CONSTRAINT "GameMatchmakingMember_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "GameMatchmakingMember_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;

-- AddForeignKey
ALTER TABLE "UserPresence" ADD CONSTRAINT "UserPresence_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMessage" ADD CONSTRAINT "ChannelMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMessage" ADD CONSTRAINT "ChannelMessage_channelId_userId_fkey" FOREIGN KEY ("channelId", "userId") REFERENCES "ChannelMember"("channelId", "userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameMatchmakingMember" ADD CONSTRAINT "GameMatchmakingMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
