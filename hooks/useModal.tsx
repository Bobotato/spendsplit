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

export default function useModal({ children }: ModalProps) {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function ModalComponent(): ReactNode {
    return <Dialog open={open}>{children}</Dialog>;
  }

  return { openModal, closeModal, ModalComponent };
}
