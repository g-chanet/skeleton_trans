/*
  Warnings:

  - The `muted` column on the `ChannelMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ChannelMember" DROP COLUMN "muted",
ADD COLUMN     "muted" BOOLEAN NOT NULL DEFAULT false;
