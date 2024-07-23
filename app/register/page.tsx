import { Container, Link, Typography } from "@mui/material";

import Register from "@/app/components/auth/Register";

import Image from "next/image";

export default function RegisterPage() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        gap: 2,
      }}
    >
      <Image
        src="/images/SpendSplitLogo.png"
        alt="Spendsplit Logo"
        width={400}
        height={100}
      />

      <Typography variant="h5">Register</Typography>

      <Register></Register>

      <Typography>Already have an account?</Typography>
      <Link href="/login">Login here.</Link>
    </Container>
  );
}
