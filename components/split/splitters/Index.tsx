"use client";

import { useState } from "react";
import useAlert from "@/hooks/useAlert";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AddSplitterForm from "@/components/split/splitters/AddSplitterForm";
import SplitterList from "@/components/split/splitters/SplitterList";

import { isNameUsed } from "@/utils/split";

import type { Splitter } from "@/types/UserTypes";

export default function SplitterIndex() {
  const [splitterList, setSplitterList] = useState<Splitter[]>([]);
  const { AlertComponent, showAlert } = useAlert();

  function handleAddSplitter(splitter: Splitter) {
    try {
      isNameUsed(splitterList, splitter.name);
      setSplitterList((prev) => [...prev, splitter]);
      showAlert(
        "Successfully Added!",
        `${splitter.name} was added to the group.`,
        "success"
      );
    } catch (e) {
      console.error(e);
      showAlert(
        "Failed to add new splitter!",
        `A splitter called ${splitter.name} is already in the group, try another name!`,
        "error"
      );
    }
  }

  return (
    <Box>
      <AlertComponent></AlertComponent>
      <Stack>
        <Typography>
          Your group currently consists of{" "}
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            {splitterList.length === 0 ? "0" : splitterList.length}
          </Typography>{" "}
          people.
        </Typography>
        <SplitterList splitterList={splitterList}></SplitterList>

        <Typography sx={{ mb: 2 }}>Add a new splitter:</Typography>
        <AddSplitterForm
          handleAddSplitter={handleAddSplitter}
        ></AddSplitterForm>
      </Stack>
    </Box>
  );
}
