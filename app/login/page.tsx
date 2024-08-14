import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import Login from "@/components/auth/Login";

import Image from "next/image";

export default function LoginPage() {
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
        priority
      />

      <Typography variant="h5">Log In</Typography>

      <Login></Login>

      <Container maxWidth="xs">
        <Button href="/split" variant="contained" fullWidth>
          Try as Guest
        </Button>
      </Container>

      <Container maxWidth="xs" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="body1">Don't have an account?</Typography>
        <Typography variant="body1">
          <Link href="/register">Register</Link>
        </Typography>
      </Container>
    </Container>
  );
}
