import { Transaction } from "@/types/TransactionTypes";
import { Splitter } from "@/types/UserTypes";

function deriveTotalFromTransactions(transactionList: Transaction[]): number {
  if (!transactionList || transactionList.length === 0) {
    return 0;
  }

  let total: number = 0;
  transactionList.forEach((transaction) => {
    total += transaction.amount;
  });

  return total;
}

function deriveLargestTransaction(transactionList: Transaction[]): Transaction {
  if (!transactionList || transactionList.length === 0) {
    throw new Error("Transaction list is empty.");
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

function isNameUsed(splitterList: Splitter[], name: string): void {
  splitterList.forEach((splitter) => {
    if (splitter.name === name) {
      throw new Error("Name is already used, please try another.");
    }
  });
}

export { deriveLargestTransaction, deriveTotalFromTransactions, isNameUsed };
