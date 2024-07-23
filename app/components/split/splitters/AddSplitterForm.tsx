"use client";

import { useState } from "react";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type { SelectChangeEvent } from "@mui/material";

import type { ReactElement } from "react";
import type { Splitter } from "@/app/types/UserTypes";

export default function AddSplitterForm(): ReactElement {
  const [newSplitter, setNewSplitter] = useState<Splitter>({
    name: "",
    colour: "",
  });

  function handleChange(
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<unknown>,
    identifier: string
  ) {
    setNewSplitter((prev) => ({
      ...prev,
      [identifier]: event.target.value,
    }));
  }
  return (
    <Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField
          margin="none"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          onChange={(event) => handleChange(event, "name")}
        />

        <FormControl fullWidth>
          <InputLabel id="colour-select-label">Colour</InputLabel>
          <Select
            labelId="colour-select-label"
            id="colour-select"
            label="Colour"
            value="None"
            onChange={(event) => handleChange(event, "colour")}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <Button>Add New Splitter</Button>
      </Box>
    </Stack>
  );
}
