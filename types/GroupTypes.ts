interface Group {
  id: number;
  createdAt: number;
  groupTitle: string;
  groupDesc: string;
  createdById: number;
  groupMembers: string[];
}

export type { Group };
