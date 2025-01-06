-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('AUTHOR', 'USER');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('UNPUBLISHED', 'PUBLISHED');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'UNPUBLISHED';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'USER';