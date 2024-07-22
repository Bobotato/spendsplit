"use client";
import { Button, FormControl, InputLabel, OutlinedInput, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material/';

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginDetails, setLoginDetails] = useState<loginDetails>({});

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
    console.log(showPassword);
  }

  function login(loginDetails: loginDetails) {
    console.log(loginDetails)
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Typography>Login</Typography>

      <Typography>Username</Typography>
      <TextField
        variant="outlined"
        sx={{ bgcolor: "white", borderRadius: 2 }}
      ></TextField>

      <Typography>Password</Typography>
      <FormControl sx={{ m: 1, width: "25ch", bgcolor: "white", borderRadius: 2 }} variant="outlined">
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Link href="/split">
        <Button variant="contained">Login</Button>
      </Link>
    </Stack>
  );
}
