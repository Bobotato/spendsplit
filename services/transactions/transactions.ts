async function getTransactionsByGroupId(
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

  export { getTransactionsByGroupId }