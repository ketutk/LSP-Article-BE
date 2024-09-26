-- CreateTable
CREATE TABLE `admin` (
    `username` VARCHAR(20) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article` (
    `article_id` VARCHAR(10) NOT NULL,
    `admin_username` VARCHAR(20) NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `text` TEXT NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `is_published` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`article_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_admin_username_fkey` FOREIGN KEY (`admin_username`) REFERENCES `admin`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
