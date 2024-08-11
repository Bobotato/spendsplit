"use client";

import { useState } from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { ReactElement } from "react";

interface HeaderProps {
  header?: string;
  subtitle?: string;
}

export default function Header({
  header,
  subtitle,
}: HeaderProps): ReactElement {
  return (
    <Container>
      <Stack>
        <Typography align="center" variant="h2" sx={{ fontWeight: "bold" }}>
          Group Name
        </Typography>
        <Typography align="center" variant="h5">
          Group desc
        </Typography>
      </Stack>
    </Container>
  );
}
