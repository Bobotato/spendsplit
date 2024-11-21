"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getUserDetailsFromJWT } from "@/services/user/user";
import { useUserStore } from "@/app/context/userContext";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import Login from "@/components/auth/Login";

import Image from "next/image";


export default function LoginPage() {

  const router = useRouter();
  const updateUserDetails = useUserStore((state) => state.updateUserDetails);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const data = await getUserDetailsFromJWT();
        const newUserDetails = await data?.json();
        updateUserDetails(newUserDetails);
        router.push('/home')
      } catch (error) {
        console.log(error)
      }
    };

    fetchUserDetails();
  }, []);

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

      <Container maxWidth="xs" sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="body1">Don't have an account?</Typography>
        <Typography variant="body1">
          <Link href="/register">Register</Link>
        </Typography>
      </Container>
    </Container>
  );
}
