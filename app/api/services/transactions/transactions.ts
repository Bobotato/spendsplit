import { prisma } from "@/app/api/services/prisma";

import { TransactionNotFoundError } from "@/app/api/services/errors";

async function getAllTransactions() {
  const res = await prisma.transactions.findMany();
  if (!res) {
    throw new TransactionNotFoundError("No transactions were found");
  } else {
    return res;
  }
}

async function getTransactionsByGroupId(groupId: number) {
  const res = await prisma.transactions.findMany({
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
  const res = await prisma.transactions.findUnique({
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
  const res = await prisma.transactions.delete({
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

async function deleteTransactionByGroupId(groupId: number) {
  const res = await prisma.transactions.deleteMany({
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
  const res = await prisma.transactions.deleteMany({});
  return res;
}

export {
  getAllTransactions,
  getTransactionsByGroupId,
  getTransactionByTransactionId,
  deleteTransactionByGroupId,
  deleteTransactionByTransactionId,
  purgeTransactions,
};
