-- AlterTable
ALTER TABLE "GameMatchmakingMember" ADD COLUMN     "targetUserId" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatarUrl" SET DEFAULT 'https://img-4.linternaute.com/q_N1jQGmO8sUI6v2LOGFcRrXqpE=/1500x/smart/08e82cbcdf5a42c8b79808bc6b15792a/ccmcms-linternaute/48672760.jpg';
