import { Transaction } from "@/types/TransactionTypes";
import { Member } from "@/types/UserTypes";

function deriveEqualSplit(
  transactionList: Transaction[],
  members: Member[]
): number {
  if (!transactionList || transactionList.length === 0) {
    return 0;
  }

  const total = deriveTotalFromTransactions(transactionList);

  return total / members.length;
}

function deriveTotalFromTransactions(transactionList: Transaction[]): number {
  if (!transactionList || transactionList.length === 0) {
    return 0;
  }

  let total: number = 0;
  transactionList.forEach((transaction) => {
    total += transaction.transactionAmount;
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
    if (transaction.transactionAmount > largestTransaction.transactionAmount) {
      largestTransaction = transaction;
    }
  });

  return largestTransaction;
}

function isNameUsed(splitterList: Member[], name: string): void {
  splitterList.forEach((splitter) => {
    if (splitter.name === name) {
      throw new Error("Name is already used, please try another.");
    }
  });
}

export { deriveEqualSplit, deriveLargestTransaction, deriveTotalFromTransactions, isNameUsed };
