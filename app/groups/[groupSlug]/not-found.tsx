import { ReactElement } from "react";

import Grid from "@mui/material/Grid";
import Link from "next/link";
import Image from "next/image";
import SpendSplitLogo from "/public/images/SpendSplitLogo.png";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function NotFound(): ReactElement {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
      }}
    >
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Image src={SpendSplitLogo} alt="Spendsplit Logo" priority={true} />

        <Typography>The specified group was not found.</Typography>
        <Typography>
          <Link href="/" className="hover:text-green-500">
            Press here to go home.
          </Link>
        </Typography>
      </Stack>
    </Grid>
  );
}
