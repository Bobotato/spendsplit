"use client";

import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  InputAdornment,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material/";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [edited, setEdited] = useState({ email: false, password: false });
  const [registerDetails, setRegisterDetails] = useState<loginDetails>({
    email: "",
    password: "",
  });

  const router = useRouter();

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
    console.log(showPassword);
  }

  function handleRegisterChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    identifier: string
  ) {
    setRegisterDetails((prev) => ({
      ...prev,
      [identifier]: event.target.value,
    }));
  }

  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(registerDetails);
    router.push("/split");
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleRegister}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextField
            margin="none"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => handleRegisterChange(event, "email")}
          />

          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Password *
            </InputLabel>
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
              onChange={(event) => handleRegisterChange(event, "password")}
              label="Password"
              autoComplete="password"
              required
            />
          </FormControl>

          <TextField
            margin="none"
            required
            fullWidth
            id="confirm-password"
            label="Confirm Password"
            name="confirm-password"
          />
        </Box>

        <Button type="submit" fullWidth variant="contained">
          Register
        </Button>
      </Box>
    </Container>
  );
}
