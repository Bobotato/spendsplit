import { prisma } from "@/app/api/services/prisma";

import { TransactionNotFoundError } from "@/app/api/services/errors";

async function createTransaction(
  transactionItem: string,
  transactionDesc: string,
  transactionAmount: number,
  transactionDate: string,
  groupId: number
) {
  const res = await prisma.transaction.create({
    data: {
      transactionItem: transactionItem,
      transactionDesc: transactionDesc,
      transactionAmount: transactionAmount,
      transactionDate: transactionDate,
      transactionGroup: {
        connect: { id: groupId },
      },
    },
  });
  return res;
}

async function getAllTransactions() {
  const res = await prisma.transaction.findMany();
  if (!res) {
    throw new TransactionNotFoundError("No transactions were found");
  } else {
    return res;
  }
}

async function getTransactionsByGroupId(groupId: number) {
  const res = await prisma.transaction.findMany({
    where: {
      groupId: groupId,
    },
  });
  if (!res) {
    throw new TransactionNotFoundError("No transactions were found");
  } else {
    return res;
  }
}

async function getTransactionByTransactionId(transactionId: number) {
  const res = await prisma.transaction.findUnique({
    where: {
      id: transactionId,
    },
  });
  if (!res) {
    throw new TransactionNotFoundError("No transactions were found");
  } else {
    return res;
  }
}

async function deleteTransactionByTransactionId(transactionId: number) {
  const res = await prisma.transaction.delete({
    where: {
      id: transactionId,
    },
  });
  if (!res) {
    throw new TransactionNotFoundError("No transactions were found");
  } else {
    return res;
  }
}

async function deleteTransactionsByGroupId(groupId: number) {
  const res = await prisma.transaction.deleteMany({
    where: {
      groupId: groupId,
    },
  });
  if (!res) {
    throw new TransactionNotFoundError("No transactions were found");
  } else {
    return res;
  }
}

async function purgeTransactions() {
  const res = await prisma.transaction.deleteMany({});
  return res;
}

export {
  createTransaction,
  getAllTransactions,
  getTransactionsByGroupId,
  getTransactionByTransactionId,
  deleteTransactionsByGroupId,
  deleteTransactionByTransactionId,
  purgeTransactions,
};
