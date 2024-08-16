import Box from "@mui/material/Box";

import Hero from "@/components/landing/hero";
import Instructions from "@/components/landing/instructions";
import AppBar from "@/components/home/Homebar";

import type { ReactElement } from "react";

export default function LandingPage(): ReactElement {
  return (
    <Box>
      <AppBar></AppBar>

      <Hero />

      <Instructions></Instructions>
    </Box>
  );
}
