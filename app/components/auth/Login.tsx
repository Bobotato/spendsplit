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

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [edited, setEdited] = useState({ email: false, password: false });
  const [loginDetails, setLoginDetails] = useState<loginDetails>({
    email: "",
    password: "",
  });

  const router = useRouter();

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
    console.log(showPassword);
  }

  function handleLoginChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    identifier: string
  ) {
    setLoginDetails((prev) => ({
      ...prev,
      [identifier]: event.target.value,
    }));
  }

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(loginDetails);
    router.push("/split");
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleLogin}
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
            onChange={(event) => handleLoginChange(event, "email")}
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
              onChange={(event) => handleLoginChange(event, "password")}
              label="Password"
              autoComplete="password"
              required
            />
          </FormControl>

          <Typography variant="body1">
            <Link href="/split">Forgot password?</Link>
          </Typography>
        </Box>

        <Button type="submit" fullWidth variant="contained">
          Log In
        </Button>
      </Box>
    </Container>
  );
}
