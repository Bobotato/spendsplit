interface Transaction {
  id: number;
  dateAdded: Date;
  dateIncurred: Date;
  name: string;
  location: string;
  amount: number;
  addedBy: string;
}

export type { Transaction };
