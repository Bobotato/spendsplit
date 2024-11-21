import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Image from "next/image";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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

      <Container sx={{ pt: 4, pb: 12 }}>
        <Stack gap={8}>
          <Box sx={{ p: 4 }}>
            <HeroBanner />
          </Box>

          <Box>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontWeight: "bold", textAlign: "center", p: 4 }}
            >
              Instructions:
            </Typography>

            <InstructionsList></InstructionsList>
          </Box>

          <Box>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontWeight: "bold", textAlign: "center", p: 4 }}
            >
              Features:
            </Typography>
            <FeatureList></FeatureList>
          </Box>

          <Box>
            <Stack
              gap={4}
              direction="column"
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src="/images/Payout.png"
                alt="Person looking at money"
                width={500}
                height={500}
              />
              <Stack gap={1}>
                <Typography color="primary" variant="h4">
                  Achieve financial freedom (from your friends) today!
                </Typography>

                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  Open source, painstakingly made and I didn't realise Spliit
                  existed until halfway through this project.
                </Typography>
              </Stack>

              <Button
                href="/register"
                variant="contained"
                size="large"
                disableElevation
                sx={{ width: "150px" }}
              >
                Register
              </Button>
            </Stack>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              href="#"
              variant="text"
              size="large"
              disableElevation
              sx={{ width: "150px" }}
              startIcon={<KeyboardArrowUpIcon />}
            >
              Back to top
            </Button>
          </Box>
        </Stack>
      </Container>

      <Footer />
    </Box>
  );
}
