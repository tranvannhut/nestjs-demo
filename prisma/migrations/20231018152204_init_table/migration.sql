/*
  Warnings:

  - Made the column `updateAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `updateAt` DATETIME(3) NOT NULL;
