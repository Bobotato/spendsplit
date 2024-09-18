"use client";

import * as dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { AddTransactionSchema } from "@/schemas/forms/split/newTransactionForm";

import type { ReactElement } from "react";
import type { Member } from "@/types/UserTypes";
import type { NewTransaction, Transaction } from "@/types/TransactionTypes";

interface AddTransactionFormProps {
  members: Member[];
  handleAddTransaction: (transaction: NewTransaction) => void;
}

interface MemberOption {
  id: string;
  label: string;
}

dayjs.extend(advancedFormat);

export default function AddTransactionForm({
  handleAddTransaction,
}: AddTransactionFormProps): ReactElement {
  const [memberOptions, setMemberOptions] = useState<MemberOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
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

  async function onSubmitNewTransaction(transaction: NewTransaction) {
    try {
      setIsLoading(true);
      handleAddTransaction(transaction);
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
      <form onSubmit={handleSubmit(onSubmitNewTransaction)} className="w-full">
        <Stack spacing={2} direction="column">
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
            {...register("transactionAmount", {
              valueAsNumber: true,
            })}
            type="number"
            label="Amount *"
            error={!!errors.transactionAmount}
            helperText={errors.transactionAmount?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            fullWidth
          ></TextField>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="transactionDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  label="Date *"
                  disableFuture
                  value={value ? dayjs.unix(value) : null}
                  onChange={(date) => {
                    const unixTimestamp = date ? date.unix() : null;
                    onChange(unixTimestamp);
                  }}
                />
              )}
            />
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
    </Box>
  );
}
