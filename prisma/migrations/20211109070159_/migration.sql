/*
  Warnings:

  - You are about to drop the column `joined_at` on the `TeamEnrollment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TeamEnrollment" DROP COLUMN "joined_at",
ADD COLUMN     "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
