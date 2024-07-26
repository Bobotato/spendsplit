"use client";

import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import AppBar from "@/components/home/Homebar";
import { subtitles } from "@/utils/heroSubtitle";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const activeSubtitleInterval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        return prevIndex === subtitles.length - 1 ? 0 : prevIndex + 1;
      });
    }, 5000);
    return () => clearInterval(activeSubtitleInterval);
  }, []);

  return (
    <Box>
      <AppBar></AppBar>

      <Stack
        spacing={4}
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 12,
          p: 8,
        }}
      >
        <Stack spacing={1}>
          <Typography
            variant="h1"
            color="primary"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            💸
          </Typography>

          <Typography
            variant="h1"
            color="primary"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Never lose track.
          </Typography>

          <Typography color="primary" variant="h4" sx={{ textAlign: "center" }}>
            {subtitles[activeIndex]}
          </Typography>
        </Stack>

        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Effortlessly track and split group spending. Always free and easy to
          use.
        </Typography>

        <Button href="/split" variant="contained" size="large" disableElevation>
          Track
        </Button>

        <Link
          href="https://www.github.com/bobotato/spendsplit"
          variant="body1"
          sx={{
            textAlign: "center",
          }}
        >
          Made by Alexander using React, Next and MUI.
        </Link>
      </Stack>
    </Box>
  );
}
