/*
  Warnings:

  - You are about to drop the column `title` on the `rooms` table. All the data in the column will be lost.
  - Added the required column `floor` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomNumber` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "title",
ADD COLUMN     "floor" TEXT NOT NULL,
ADD COLUMN     "roomNumber" TEXT NOT NULL;
