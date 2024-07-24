"use client";

import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import AddSplitterForm from "@/app/components/split/splitters/AddSplitterForm";
import SplitterList from "@/app/components/split/splitters/SplitterList";

import type { Splitter } from "@/app/types/UserTypes";

export default function SplitterIndex() {
  const [splitterList, setSplitterList] = useState<Splitter[]>([]);

  function handleAddSplitter(splitter: Splitter) {
    setSplitterList((prev) => [...prev, splitter]);
  }

  return (
    <Container sx={{ bgcolor: "green" }}>
      <Typography>Add a new splitter:</Typography>
      <Typography>
        Your group currently consists of{" "}
        {splitterList.length === 0 ? "0" : splitterList.length} people.
      </Typography>
      <SplitterList splitterList={splitterList}></SplitterList>
      <AddSplitterForm></AddSplitterForm>
    </Container>
  );
}
