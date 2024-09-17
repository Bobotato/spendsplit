"use client";
import * as dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { AddTransactionSchema } from "@/schemas/forms/split/newTransactionForm";

import type { ReactElement } from "react";
import type { Member } from "@/types/UserTypes";
import type { NewTransaction } from "@/types/TransactionTypes";

interface AddTransactionFormProps {
  members: Member[];
  handleAddTransaction: (transaction: NewTransaction) => void;
}

interface MemberOption {
  id: string;
  label: string;
}

export default function AddTransactionForm({
  handleAddTransaction,
}: AddTransactionFormProps): ReactElement {
  const [memberOptions, setMemberOptions] = useState<MemberOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTransactionSchema>({
    mode: "all",
    resolver: zodResolver(AddTransactionSchema),
  });

  function generateMemberOptionList(memberList: Member[]) {
    memberList.forEach((member) => {
      setMemberOptions((prev) => [
        ...prev,
        {
          id: member.name,
          label: member.name,
        },
      ]);
    });
  }

  useEffect(() => {
    generateMemberOptionList;
  }, [memberOptions]);

  async function handleSubmitTransactionClick(transaction: NewTransaction) {
    try {
      setIsLoading(true);
      console.log(transaction)
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

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
        <form onSubmit={handleSubmit(handleSubmitTransactionClick)} noValidate>
          <Stack
            spacing={2}
            direction="column"
            sx={{ justifyContent: "spread-between" }}
          >
            <TextField
              {...register("transactionItem")}
              label="Item Name *"
              error={!!errors.transactionItem}
              helperText={errors.transactionItem?.message}
              fullWidth
            ></TextField>
            <TextField
              {...register("transactionDesc")}
              label="Description"
              error={!!errors.transactionDesc}
              helperText={errors.transactionDesc?.message}
              fullWidth
            ></TextField>
            <TextField
              {...register("transactionAmount")}
              label="Amount *"
              error={!!errors.transactionAmount}
              helperText={errors.transactionAmount?.message}
              fullWidth
            ></TextField>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker {...register("transactionDate")} label="Date *" />
            </LocalizationProvider>

            <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 4 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={25} /> : "Add transaction"}
        </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
