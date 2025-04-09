/*
  Warnings:

  - You are about to drop the column `imgURL` on the `item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "item" DROP COLUMN "imgURL",
ADD COLUMN     "nomeImg" TEXT;
