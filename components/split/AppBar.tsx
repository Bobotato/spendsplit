"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";

import Image from "next/image";

import type { ReactElement } from "react";
import { useRouter } from "next/navigation";

export default function ButtonAppBar(): ReactElement {
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (response.ok) {
        router.push("/logout");
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Box sx={{ width: "100%", flexGrow: 1 }}>
      <AppBar position="static" sx={{ p: 2 }}>
        <Toolbar
          sx={{ display: "flex", flexGrow: 1, justifyContent: "space-between" }}
        >
          <Link href="/">
            <Image
              src="/images/SpendSplitLogoWhite.png"
              alt="Spendsplit Logo"
              width={200}
              height={50}
            />
          </Link>

          <Stack direction="row">
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
