import { ReactElement } from "react";

import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import TransactionItem from "@/app/components/split/TransactionItem";

import type { Transaction } from "@/app/types/TransactionTypes";

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({
  transactions,
}: TransactionListProps): ReactElement {
  return (
    <Container>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index} className="text-white">
            <TransactionItem transactionItem={transaction}></TransactionItem>
          </li>
        ))}
      </ul>
    </Container>
  );
}
