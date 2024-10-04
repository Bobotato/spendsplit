"use client";

import * as dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import useAlert from "@/hooks/useAlert";
import { zodResolver } from "@hookform/resolvers/zod";

import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
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
  disabled: boolean;
}

dayjs.extend(advancedFormat);

export default function AddTransactionForm({
  members,
  handleAddTransaction,
  disabled,
}: AddTransactionFormProps): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showAlert, AlertComponent } = useAlert();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddTransactionSchema>({
    mode: "all",
    resolver: zodResolver(AddTransactionSchema),
  });

  async function onSubmitNewTransaction(transaction: NewTransaction) {
    try {
      setIsLoading(true);
      handleAddTransaction(transaction);
      reset();
      showAlert(
        "Success",
        `Your transaction for ${transaction.transactionItem} was added successfully.`,
        "success"
      );
    } catch (e) {
      console.error(e);
      showAlert(
        "Error",
        "Your transaction was not added. Please try again later.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  }

  const names = ["alex", "lotus", "marhsall", "ali"];

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

          <Autocomplete
            sx={{ m: 1, width: '100%' }}
            multiple
            options={members}
            getOptionLabel={(member) => member.name}
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Splitters"
                placeholder="Splitters"
              />
            )}
            renderOption={(props, option, { selected }) => (
              <MenuItem
                {...props}
                key={option.id}
                value={option.name}
                sx={{ justifyContent: "space-between" }}
              >
                {option.name}
                {selected ? <CheckIcon color="info" /> : null}
              </MenuItem>
            )}
          />

          <AlertComponent></AlertComponent>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 4 }}
            disabled={isLoading || disabled}
          >
            {isLoading ? <CircularProgress size={25} /> : "Add transaction"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
