import { useState } from "react";

import {
  convertPrismaDateToDateString,
  convertUnixToDateString,
} from "@/utils/helpers";

import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import type { ReactElement } from "react";
import type { Transaction } from "@/types/TransactionTypes";

interface TransactionListProps {
  transactions?: Transaction[];
}

interface TransactionTableColumn {
  id:
    | "id"
    | "createdAt"
    | "transactionItem"
    | "transactionDesc"
    | "transactionAmount"
    | "transactionDate";
  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
  formatDate?: "prisma" | "unix";
  prefix?: string;
}

const transactionTableColumns: TransactionTableColumn[] = [
  { id: "createdAt", label: "Date Added", minWidth: 100, formatDate: "prisma" },
  { id: "transactionItem", label: "Item", minWidth: 170 },
  { id: "transactionDesc", label: "Description", minWidth: 170 },
  { id: "transactionAmount", label: "Amount", minWidth: 100, prefix: "$" },
  {
    id: "transactionDate",
    label: "Date Incurred",
    minWidth: 100,
    formatDate: "unix",
  },
];

export default function TransactionTable({
  transactions,
}: TransactionListProps): ReactElement {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatValue = (column: TransactionTableColumn, value: any) => {
    switch (column.formatDate) {
      case "prisma":
        return convertPrismaDateToDateString(value);

      case "unix":
        return convertUnixToDateString(value);
    }
  };

  return (
    <Container sx={{ width: "100%", overflow: "hidden" }}>
      {!transactions || transactions.length === 0 ? (
        <Typography variant="body1">
          There are currently no transactions to show. Add some transactions
          using the add transaction form below.
        </Typography>
      ) : (
        <>
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
                          console.log(value);
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.formatDate
                                ? formatValue(column, value)
                                : column.prefix
                                ? `${column.prefix}${value}`
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
        </>
      )}
    </Container>
  );
}
