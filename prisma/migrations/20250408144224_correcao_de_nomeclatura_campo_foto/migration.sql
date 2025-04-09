/*
  Warnings:

  - You are about to drop the column `foto` on the `item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "item" DROP COLUMN "foto",
ADD COLUMN     "imgURL" TEXT;
