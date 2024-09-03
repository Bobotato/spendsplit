import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import type { ReactNode } from "react";

export interface ModalProps {
  title: string;
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

  function ModalComponent({ title, children }: ModalProps): ReactNode {
    return (
      <Dialog open={open} onClose={closeModal}>
        <DialogTitle sx={{ px: 4, pt: 4 }}>{title}</DialogTitle>
        <DialogContent sx={{ p: 4 }}>{children}</DialogContent>
      </Dialog>
    );
  }

  return { openModal, closeModal, ModalComponent };
}
