/*
  Warnings:

  - The values [WaitingConfirm] on the enum `EUserRelationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EUserRelationType_new" AS ENUM ('WaitingAccept', 'PendingAccept', 'Friend', 'Blocked');
ALTER TABLE "UserRelation" ALTER COLUMN "type" TYPE "EUserRelationType_new" USING ("type"::text::"EUserRelationType_new");
ALTER TYPE "EUserRelationType" RENAME TO "EUserRelationType_old";
ALTER TYPE "EUserRelationType_new" RENAME TO "EUserRelationType";
DROP TYPE "EUserRelationType_old";
COMMIT;
