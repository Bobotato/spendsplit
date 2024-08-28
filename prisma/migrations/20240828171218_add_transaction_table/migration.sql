-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionItem" TEXT NOT NULL,
    "transactionAmount" INTEGER NOT NULL,
    "transactionIncurred" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "splitters" TEXT[],
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "TransactionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
