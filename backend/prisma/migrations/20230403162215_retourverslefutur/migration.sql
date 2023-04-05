/*
  Warnings:

  - The primary key for the `ChannelMessage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GameStat` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ChannelMessage" DROP CONSTRAINT "ChannelMessage_pkey",
ADD CONSTRAINT "ChannelMessage_pkey" PRIMARY KEY ("id", "userId");

-- AlterTable
ALTER TABLE "GameStat" DROP CONSTRAINT "GameStat_pkey",
ADD CONSTRAINT "GameStat_pkey" PRIMARY KEY ("id", "userId");
