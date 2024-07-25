"use client";

import { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AddSplitterForm from "@/app/components/split/splitters/AddSplitterForm";
import SplitterList from "@/app/components/split/splitters/SplitterList";

import type { Splitter } from "@/app/types/UserTypes";
import { StackedLineChartOutlined } from "@mui/icons-material";

export default function SplitterIndex() {
  const [splitterList, setSplitterList] = useState<Splitter[]>([]);

  function handleAddSplitter(splitter: Splitter) {
    setSplitterList((prev) => [...prev, splitter]);
  }

  return (
    <Stack sx={{ maxWidth: "md" }}>
      <Typography>
        Your group currently consists of{" "}
        {splitterList.length === 0 ? "0" : splitterList.length} people.
      </Typography>
      <SplitterList splitterList={splitterList}></SplitterList>

      <Typography>Add a new splitter:</Typography>
      <AddSplitterForm></AddSplitterForm>
    </Stack>
  );
}
