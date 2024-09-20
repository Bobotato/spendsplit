interface Transaction {
  id: number;
  createdAt: string;
  transactionItem: string;
  transactionDesc: string;
  transactionAmount: number;
  transactionDate: number;
}

interface NewTransaction {
  transactionItem: string;
  transactionDesc?: string;
  transactionAmount: number;
  transactionDate: number;
}

export type { Transaction, NewTransaction };