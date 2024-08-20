"use client";
import * as dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextFieldElement, AutocompleteElement } from "react-hook-form-mui";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import type { ReactElement } from "react";
import type { Splitter } from "@/types/UserTypes";
import type { Transaction } from "@/types/TransactionTypes";
import { Preview } from "@mui/icons-material";

interface AddSplitterFormProps {
  splitters: Splitter[];
  handleAddTransaction: (transaction: Transaction) => void;
}

interface SplitterOption {
  id: string;
  label: string;
}

export default function AddTransactionForm({
  handleAddTransaction,
}: AddSplitterFormProps): ReactElement {
  const [splitterOptions, setSplitterOptions] = useState<SplitterOption[]>([]);
  const { control, handleSubmit } = useForm();

  function generateSplitterOptionList(splitterList: Splitter[]) {
    splitterList.forEach((splitter) => {
      setSplitterOptions((prev) => [
        ...prev,
        {
          id: splitter.name,
          label: splitter.name,
        },
      ]);
    });
  }

  useEffect(() => {
    generateSplitterOptionList;
    console.log(splitterOptions);
  }, [splitterOptions]);

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
        direction="column"
        justifyContent="center"
        spacing={2}
        sx={{ width: "100%" }}
      >
        <form onSubmit={handleSubmit(handleAddTransaction)} noValidate>
          <Stack
            spacing={2}
            direction="column"
            sx={{ justifyContent: "spread-between" }}
          >
            <TextFieldElement
              name={"item"}
              label={"Item"}
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

            <AutocompleteElement
              name={"owedBy"}
              label={"Owed By"}
              options={splitterOptions}
              control={control}
              multiple
            ></AutocompleteElement>

            <Button type="submit" variant="contained" color={"primary"}>
              Add
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
