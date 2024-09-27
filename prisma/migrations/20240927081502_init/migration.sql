/*
  Warnings:

  - You are about to drop the column `admin_username` on the `article` table. All the data in the column will be lost.
  - Added the required column `author_username` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `article` DROP FOREIGN KEY `Article_admin_username_fkey`;

-- AlterTable
ALTER TABLE `article` DROP COLUMN `admin_username`,
    ADD COLUMN `author_username` VARCHAR(20) NOT NULL,
    MODIFY `is_published` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_author_username_fkey` FOREIGN KEY (`author_username`) REFERENCES `admin`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
