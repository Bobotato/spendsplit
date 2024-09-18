/*
  Warnings:

  - Changed the type of `transactionDate` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transactionDate",
ADD COLUMN     "transactionDate" INTEGER NOT NULL;
