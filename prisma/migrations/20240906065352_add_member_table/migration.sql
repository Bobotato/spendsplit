/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `splitters` on the `Transaction` table. All the data in the column will be lost.
  - The `transactionDate` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `groupMembers` on the `TransactionGroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "createdBy",
DROP COLUMN "splitters",
DROP COLUMN "transactionDate",
ADD COLUMN     "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TransactionGroup" DROP COLUMN "groupMembers";

-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "TransactionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
