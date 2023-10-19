/*
  Warnings:

  - You are about to drop the column `createUser` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `updateUser` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `createUser` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updateUser` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Note` DROP COLUMN `createUser`,
    DROP COLUMN `updateUser`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `createUser`,
    DROP COLUMN `updateUser`;
