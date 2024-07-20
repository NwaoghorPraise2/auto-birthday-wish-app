/*
  Warnings:

  - Added the required column `salt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_id_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "salt" TEXT NOT NULL;
