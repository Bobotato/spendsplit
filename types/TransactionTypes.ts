interface Transaction {
  id: number;
  dateAdded: string;
  dateIncurred: string;
  name: string;
  location: string;
  amount: number;
  addedBy: string;
}

interface NewTransaction {
  transactionItem: string;
  transactionDesc?: string;
  transactionAmount: number;
  transactionDate: number;
}

export type { Transaction, NewTransaction };
