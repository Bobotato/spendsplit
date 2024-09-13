-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_groupId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionGroup" DROP CONSTRAINT "TransactionGroup_createdById_fkey";

-- AddForeignKey
ALTER TABLE "TransactionGroup" ADD CONSTRAINT "TransactionGroup_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "TransactionGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "TransactionGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
