import { Transaction } from "@/app/types/TransactionTypes";

function deriveTotalFromTransactions(transactionList: Transaction[]): number {
  if (!transactionList || transactionList.length === 0) {
    throw new Error("Transaction list cannot be empty.");
  }

  let total: number = 0;
  transactionList.forEach((transaction) => {
    total += transaction.amount;
  });

  return total;
}

function deriveLargestTransaction(transactionList: Transaction[]): Transaction {
  if (!transactionList || transactionList.length === 0) {
    throw new Error("Transaction list cannot be empty.");
  }

  if (transactionList.length === 1) {
    return transactionList[0];
  }

  let largestTransaction: Transaction = transactionList[0];

  transactionList.forEach((transaction) => {
    if (transaction.amount > largestTransaction.amount) {
      largestTransaction = transaction;
    }
  });

  return largestTransaction;
}

export { deriveLargestTransaction, deriveTotalFromTransactions };
