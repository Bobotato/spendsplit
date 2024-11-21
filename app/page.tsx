import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import HeroBanner from "@/components/landing/HeroBanner";
import InstructionsList from "@/components/landing/InstructionsList";
import FeatureList from "@/components/landing/FeatureList";
import AppBar from "@/components/home/Homebar";
import Footer from "@/components/general/footer/Footer";

import type { ReactElement } from "react";

export default function LandingPage(): ReactElement {
  return (
    <Box>
      <AppBar></AppBar>

      <Container sx={{ py: 4 }}>
        <Stack gap={4}>
          <HeroBanner />

          <Typography
            variant="h4"
            color="primary"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Instructions:
          </Typography>

          <InstructionsList></InstructionsList>

          <Typography
            variant="h4"
            color="primary"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Features:
          </Typography>
          <FeatureList></FeatureList>
        </Stack>
      </Container>

      <Footer />
    </Box>
  );
}
