"use client";

import { useState } from "react";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import AddSplitterForm from "@/app/components/split/splitters/AddSplitterForm";
import SplitterList from "@/app/components/split/splitters/SplitterList";

import { isNameUsed } from "@/app/utils/split";

import type { Splitter } from "@/app/types/UserTypes";

export default function SplitterIndex() {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [splitterList, setSplitterList] = useState<Splitter[]>([]);

  function AlertSnackbar() {
    return (
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSnackbarOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Successfully Added</AlertTitle>
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    );
  }

  function handleAddSplitter(splitter: Splitter) {
    try {
      isNameUsed(splitterList, splitter.name);
      setSplitterList((prev) => [...prev, splitter]);
      setSnackbarOpen(true);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Box>
      <AlertSnackbar></AlertSnackbar>
      <Stack>
        <Typography>
          Your group currently consists of{" "}
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            {splitterList.length === 0 ? "0" : splitterList.length}
          </Typography>{" "}
          people.
        </Typography>
        <SplitterList splitterList={splitterList}></SplitterList>

        <Typography>Add a new splitter:</Typography>
        <AddSplitterForm
          handleAddSplitter={handleAddSplitter}
        ></AddSplitterForm>
      </Stack>
    </Box>
  );
}
