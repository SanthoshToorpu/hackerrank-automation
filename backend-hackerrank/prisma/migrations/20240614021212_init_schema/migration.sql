/*
  Warnings:

  - You are about to drop the column `language` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `problem` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Problem]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Problem` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SolutionLink` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_problem_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "language",
DROP COLUMN "problem",
ADD COLUMN     "Problem" TEXT NOT NULL,
ADD COLUMN     "SolutionLink" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_Problem_key" ON "User"("Problem");
