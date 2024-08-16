import { useState } from "react";

import Dialog from "@mui/material/Dialog";

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
