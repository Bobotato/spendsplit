import SocialsStack from "@/components/general/SocialsStack";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Image from "next/image";

import type { ReactElement } from "react";

export default function Footer(): ReactElement {
  return (
    <Box
      sx={{
        width: "100%",
        flexGrow: 1,
        backgroundColor: "primary.main",
        display: "flex",
        justifyContent: "center",
        py: 12,
      }}
    >
      <Stack gap={4}>
        <Box>
          <Link href="/">
            <Image
              src="/images/SpendSplitLogoWhite.png"
              alt="Spendsplit Logo"
              width={200}
              height={50}
            />
          </Link>

          <Typography sx={{ color: "white" }}>
            Made by Alexander Bhojwani
          </Typography>
        </Box>

        <SocialsStack />
      </Stack>
    </Box>
  );
}