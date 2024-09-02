interface Data {
    id: number;
    createdAt: number;
    groupTitle: string;
    groupDesc: string;
    goButton: string;
    deleteButton: string;
  }

  type Order = "asc" | "desc";

  interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
  }

  export type { Data, Order, HeadCell }