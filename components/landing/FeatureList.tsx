import FeatureCard from "@/components/landing/FeatureCard";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { ReactElement } from "react";

const features = [
  {
    featureNumber: 1,
    title: "Create multiple groups for multiple events",
    description: "Login or register so we can remember you.",
  },
  {
    featureNumber: 2,
    title: "Create and categorise transactions with as multiple splitters",
    description: "A group can be for an event or any occassion.",
  },
  {
    featureNumber: 3,
    title: "Upload images of receipts and items to show what you've bought",
    description: "Start getting back the money people owe you.",
  },
  {
    featureNumber: 4,
    title: "Upload images of receipts and items to show what you've bought",
    description: "Start getting back the money people owe you.",
  },
];

export default function FeatureList(): ReactElement {
  return (
    <Box maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {features.map((feature) => (
          <FeatureCard
            featureCard={feature}
            key={feature.featureNumber}
          ></FeatureCard>
        ))}
      </Box>
    </Box>
  );
}
