import type { HeadCell } from "@/types/TableTypes";

const headCells: readonly HeadCell[] = [
    {
      id: "createdAt",
      numeric: true,
      disablePadding: true,
      label: "Created At",
    },
    {
      id: "groupTitle",
      numeric: false,
      disablePadding: false,
      label: "Group Name",
    },
    {
      id: "groupDesc",
      numeric: false,
      disablePadding: false,
      label: "Description",
    },
    {
      id: "goButton",
      numeric: false,
      disablePadding: false,
      label: "",
    },
    {
      id: "deleteButton",
      numeric: false,
      disablePadding: false,
      label: "",
    },
  ];

export { headCells }