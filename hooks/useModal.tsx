import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import type { ReactNode } from "react";

export interface ModalProps {
  children: ReactNode;
}

export default function useModal() {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function ModalComponent(): ReactNode {
    return (
      <Dialog open={open}>
        <>
          <DialogTitle sx={{ px: 4, pt: 4 }}>Warning</DialogTitle>
          <DialogContent sx={{ p: 4 }}>
            <Stack direction="column" spacing={3}>
              <Typography variant="body1">
                You are about to delete all transactions. This process is{" "}
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  irreversible
                </Typography>
                .
              </Typography>
              <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
                <Button variant="contained" onClick={closeModal}>
                  Acknowledge and Confirm
                </Button>
                <Button variant="contained" onClick={closeModal}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </DialogContent>
        </>
      </Dialog>
    );
  }

  return { openModal, closeModal, ModalComponent };
}
