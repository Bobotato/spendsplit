import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { footerData } from "@/app/data/Footer/footerData";

import type { ReactElement } from "react";

export default function FooterLinks(): ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack direction={"row"} gap={16} sx={{ px: 4, py: 2 }}>
        {footerData.map((footerList, index) => (
          <Stack direction={"column"} gap={2} key={index}>
            <Typography variant="h6" color="white">{footerList.category}</Typography>
            <Stack direction={"column"} gap={1}>
              {footerList.items.map((footerItem, index) => (
                <Typography color="white" key={index}>
                  <Link
                    underline="hover"
                    color="inherit"
                    href={footerItem.link}
                  >
                    {footerItem.label}
                  </Link>
                </Typography>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
