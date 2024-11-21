import Box from "@mui/material/Box";

import HeroBanner from "@/components/landing/HeroBanner";
import Instructions from "@/components/landing/Instructions";
import AppBar from "@/components/home/Homebar";
import Footer from "@/components/general/footer/Footer";

import type { ReactElement } from "react";

export default function LandingPage(): ReactElement {
  return (
    <Box>
      <AppBar></AppBar>

      <HeroBanner />

      <Instructions></Instructions>

      <Footer />
    </Box>
  );
}
