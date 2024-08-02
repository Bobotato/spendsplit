"use client";
import * as dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { TextFieldElement, AutocompleteElement } from "react-hook-form-mui";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import type { ReactElement } from "react";
import type { Splitter } from "@/types/UserTypes";
import type { Transaction } from "@/types/TransactionTypes";

interface AddSplitterFormProps {
  splitters: Splitter[];
  handleAddTransaction: (transaction: Transaction) => void;
}

export default function AddTransactionForm({
  handleAddTransaction,
}: AddSplitterFormProps): ReactElement {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      location: "",
      amount: 0,
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        width: "100%",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ width: "100%" }}
      >
        <form onSubmit={handleSubmit(handleAddTransaction)} noValidate>
          <Stack
            spacing={2}
            direction="row"
            sx={{ justifyContent: "spread-between" }}
          >
            <TextFieldElement
              name={"name"}
              label={"Name"}
              control={control}
              required
              fullWidth
            />

            <TextFieldElement
              name={"location"}
              label={"Location"}
              control={control}
              required
              fullWidth
            />

            <TextFieldElement
              name={"amount"}
              label={"Amount"}
              control={control}
              required
              fullWidth
            />

            <Button type="submit" variant="contained" color={"primary"}>
              Add
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}

interface Transaction {
  id: number;
  dateAdded: string;
  dateIncurred: string;
  name: string;
  location: string;
  amount: number;
  addedBy: string;
}
