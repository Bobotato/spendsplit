"use client";

import { useState } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";

import type { AlertColor, AlertPropsColorOverrides } from "@mui/material/Alert";
import type { OverridableStringUnion } from "@mui/types";

export default function useAlert() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] =
    useState<OverridableStringUnion<AlertColor, AlertPropsColorOverrides>>(
      "success"
    );

  function showAlert(
    title: string,
    message: string,
    severity: "success" | "info" | "warning" | "error"
  ) {
    setMessage(message);
    setTitle(title);
    setSeverity(severity);
    setAlertOpen(true);
  }

  function closeAlert() {
    setAlertOpen(false);
  }

  function AlertComponent() {
    return (
      <Snackbar
        open={alertOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={5000}
        sx={{ p: 4, width: "100%", maxWidth: "md" }}
      >
        <Alert
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                closeAlert();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>{title}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    );
  }

  return { showAlert, AlertComponent };
}
