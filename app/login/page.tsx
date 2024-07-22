"use client";
import { Button, Container, TextField, Typography } from "@mui/material";

import Login from "@/app/components/auth/Login";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

export default function LoginPage() {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', border: 1 , alignItems: 'center' }}>
      <Image
        src="/images/SpendSplitLogo.png"
        alt="Spendsplit Logo"
        width={400}
        height={100}
      />

      <Login></Login>

      <Typography>
        Don't have an account?{" "}
        <Link href="/register">
          <Typography>Register here.</Typography>
        </Link>
      </Typography>
    </Container>
  );
}
