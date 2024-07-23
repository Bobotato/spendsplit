interface Transaction {
  id: number;
  dateAdded: string;
  dateIncurred: string;
  name: string;
  location: string;
  amount: number;
  addedBy: string;
}

export type { Transaction };
