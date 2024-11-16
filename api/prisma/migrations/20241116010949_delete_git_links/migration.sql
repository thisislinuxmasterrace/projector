/*
  Warnings:

  - You are about to drop the column `gitBranch` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `gitIssue` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `gitPullRequest` on the `Task` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectId,userId]` on the table `ProjectInvite` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "gitBranch",
DROP COLUMN "gitIssue",
DROP COLUMN "gitPullRequest";

-- CreateIndex
CREATE UNIQUE INDEX "ProjectInvite_projectId_userId_key" ON "ProjectInvite"("projectId", "userId");
