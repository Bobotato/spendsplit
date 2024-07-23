"use client";

import { ReactNode, useState } from "react";

export default function AddExpenseForm(): ReactNode {
  const [transactionInput, setTransactionInput] = useState<string>("");
  const [transactionList, setTransactionList] = useState<string[]>([]);

  function addTransaction(value: string) {
    console.log(value);
  }

  return (
    <div className="flex flex-col">
      <input
        name="transaction"
        type="text"
        onChange={(e) => setTransactionInput(e.target.value)}
      />
      <button onClick={() => addTransaction(transactionInput)} type="button">
        Add new transaction
      </button>
    </div>
  );
}
