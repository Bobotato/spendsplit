"use client";

import { useForm } from "react-hook-form";
import { TextFieldElement, AutocompleteElement } from "react-hook-form-mui";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

import type { ReactElement } from "react";
import type { Splitter } from "@/app/types/UserTypes";

export default function AddSplitterForm(): ReactElement {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      auto: "",
    },
  });
  const options = [
    { id: "one", label: "One" },
    { id: "two", label: "Two" },
    { id: "three", label: "Three" },
  ];

  function handleAddNewSplitter() {
    console.log("Submit");
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        width: "100%",
        border: 2,
        borderColor: "red",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        sx={{ width: "100%" }}
      >
        <form onSubmit={handleSubmit((data) => console.log(data))} noValidate>
          <Stack spacing={2}>
            <TextFieldElement
              name={"name"}
              label={"Name"}
              control={control}
              required
              fullWidth
            />
            <AutocompleteElement
              name={"auto"}
              label={"Autocomplete"}
              control={control}
              options={options}
            />
            <Button type={"submit"} variant="contained" color={"primary"}>
              Add
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
}
