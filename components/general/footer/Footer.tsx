import SocialsStack from "@/components/general/SocialsStack";
import FooterLinks from "@/components/general/footer/FooterLinks";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
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
        justifyContent: "space-between",
        p: 8,
      }}
    >
      <Stack gap={4} direction={"column"}>
        <Stack direction={"column"}>
          <Box sx={{ py: 2, ml: -1 }}>
            <Link href="/">
              <Image
                src="/images/SpendSplitLogoWhite.png"
                alt="Spendsplit Logo"
                width={200}
                height={50}
              />
            </Link>
          </Box>

          <Typography sx={{ color: "white" }}>
            Made by Alexander Bhojwani
          </Typography>

          <Typography sx={{ color: "white" }}>
            Built with{" "}
            <Link underline="always" color="inherit" href="https://nextjs.org/">
              NextJS
            </Link>
            ,{" "}
            <Link underline="always" color="inherit" href="https://react.dev/">
              React
            </Link>{" "}
            and{" "}
            <Link color="inherit" href="https://mui.com/" underline="always">
              MUI
            </Link>
            .
          </Typography>
        </Stack>

        <SocialsStack />
      </Stack>

      <Box>
        <FooterLinks />
      </Box>
    </Box>
  );
}
