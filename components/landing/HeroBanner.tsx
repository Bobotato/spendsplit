"use client";

import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import { subtitles } from "@/utils/heroSubtitle";

export default function Hero() {
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
        Effortlessly track and split group spending. Made by Alexander using
        React, Next and MUI.
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button href="/login" variant="contained" size="large" disableElevation>
          Login
        </Button>

        <Button
          href="/register"
          variant="contained"
          size="large"
          disableElevation
        >
          Register
        </Button>
      </Stack>
    </Stack>
  );
}
