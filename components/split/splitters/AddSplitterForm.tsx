"use client";

import { useForm } from "react-hook-form";
import { TextFieldElement, AutocompleteElement } from "react-hook-form-mui";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { splitterColours } from "@/utils/colourList";

import type { ReactElement, FormEvent } from "react";
import type { Splitter } from "@/types/UserTypes";

interface AddSplitterFormProps {
  handleAddSplitter: (splitter: Splitter) => void;
}

export default function AddSplitterForm({
  handleAddSplitter,
}: AddSplitterFormProps): ReactElement {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
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
        <form onSubmit={handleSubmit(handleAddSplitter)} noValidate>
          <Stack spacing={2} direction="row">
            <TextFieldElement
              name={"name"}
              label={"Name"}
              control={control}
              required
              fullWidth
            />
          </Stack>

          <Button type="submit" variant="contained" color={"primary"}>
            Add
          </Button>
        </form>
      </Stack>
    </Box>
  );
}
