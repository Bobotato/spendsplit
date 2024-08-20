import { create } from "zustand";

import type { Transaction } from "@/types/TransactionTypes";

interface TransactionListState {
  transactions: Transaction[];
  resetTransactions: () => void;
}

const transactionsTestData: Transaction[] = [
    {
      id: 1,
      dateAdded: "2024-07-01",
      dateIncurred: "2024-06-30",
      name: "Grocery Store",
      location: "New York, NY",
      amount: 45.67,
      addedBy: "Alice",
    },
    {
      id: 2,
      dateAdded: "2024-07-02",
      dateIncurred: "2024-06-29",
      name: "Gas Station",
      location: "Los Angeles, CA",
      amount: 30.25,
      addedBy: "Bob",
    },
    {
      id: 3,
      dateAdded: "2024-07-03",
      dateIncurred: "2024-06-28",
      name: "Electric Bill",
      location: "Chicago, IL",
      amount: 120.0,
      addedBy: "Charlie",
    },
    {
      id: 4,
      dateAdded: "2024-07-04",
      dateIncurred: "2024-06-27",
      name: "Internet Bill",
      location: "Houston, TX",
      amount: 60.0,
      addedBy: "Diana",
    },
    {
      id: 5,
      dateAdded: "2024-07-05",
      dateIncurred: "2024-06-26",
      name: "Dining Out",
      location: "Miami, FL",
      amount: 75.5,
      addedBy: "Eve",
    },
  ];

const useTransactionListStore = create<TransactionListState>()((set) => ({
  transactions: transactionsTestData,
  resetTransactions: () => set({ transactions: [] }),
}));

export { useTransactionListStore }