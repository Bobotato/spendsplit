import { NewTransaction } from "@/types/TransactionTypes";

async function addNewTransaction(transaction: NewTransaction, groupId: number) {
  try {
    const response = await fetch("../api/split/transactions/createTransaction", {
      method: "POST",
      body: JSON.stringify({
        transactionItem: transaction.transactionItem,
        transactionDesc: transaction.transactionDesc,
        transactionAmount: transaction.transactionAmount,
        transactionDate: transaction.transactionDate,
        groupId: groupId
      }),
    });
    return response;
  } catch (e) {
    console.error(e);
  }
}


async function fetchGroupTransactions(
    groupId: number
  ) {
    try {
      const response = await fetch("../api/split/transactions/getTransactionsByGroupId", {
        method: "POST",
        body: JSON.stringify({
          groupId: groupId,
        }),
      });
      return response;
    } catch (e) {
      console.error(e);
    }
  }

  async function purgeAllTransactions(
    groupId: number
  ) {
    try {
      const response = await fetch("../api/split/transactions/deleteAllTransactions", {
        method: "POST",
        body: JSON.stringify({
          groupId: groupId,
        }),
      });
      return response;
    } catch (e) {
      console.error(e);
    }
  }


  export { addNewTransaction, fetchGroupTransactions, purgeAllTransactions }