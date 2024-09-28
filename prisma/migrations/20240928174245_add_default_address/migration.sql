/*
  Warnings:

  - You are about to drop the column `defaultBilingAdress` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `defaultBilingAdress`,
    ADD COLUMN `defaultBillingAddress` INTEGER NULL;
