import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";

import Image from "next/image";

import type { ReactElement } from "react";

export default function ButtonAppBar(): ReactElement {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ p: 2 }}>
        <Toolbar
          sx={{ display: "flex", flexGrow: 1, justifyContent: "space-between" }}
        >
          <Image
            src="/images/SpendSplitLogoWhite.png"
            alt="Spendsplit Logo"
            width={200}
            height={50}
          />

          <Stack direction="row">
            <Button href="/login" color="inherit">
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
