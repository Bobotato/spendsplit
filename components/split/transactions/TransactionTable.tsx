import { useState } from "react";

import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { useTransactionListStore } from "@/app/context/splitContext";

import type { ReactElement } from "react";
import type { Transaction } from "@/types/TransactionTypes";

interface TransactionListProps {
  transactions?: Transaction[];
}

interface TransactionTableColumn {
  id:
    | "id"
    | "dateAdded"
    | "dateIncurred"
    | "name"
    | "location"
    | "amount"
    | "addedBy";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const transactionTableColumns: TransactionTableColumn[] = [
  { id: "dateAdded", label: "Date Added", minWidth: 170 },
  { id: "dateIncurred", label: "Date Incurred", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "location", label: "Location", minWidth: 170 },
  { id: "amount", label: "Amount", minWidth: 170 },
  { id: "addedBy", label: "Added By", minWidth: 170 },
];

export default function TransactionTable(): ReactElement {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const transactions = useTransactionListStore((state) => state.transactions);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {transactionTableColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={transaction.id}
                  >
                    {transactionTableColumns.map((column) => {
                      const value = transaction[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
}
