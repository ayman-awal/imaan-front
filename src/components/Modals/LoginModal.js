import React, { useState } from "react";
import axios from "axios";
import Link from "@mui/material/Link";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { GoogleIcon } from "../CustomIcons";
import { useAuth } from "@/context/AuthContext";
import CustomTextField from "../CustomTextField";

function LoginModal({ openModal, closeModal }) {
  const { login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          email,
          password,
        }
      );

      const token = response.data.token;

      if (token) {
        login(token);
        closeModal();
      } else {
        logout();
      }
    } catch (error) {
      console.error(error);
      setError("Invalid email or password.");
    }
  };

  const handleGoogleLogin = () => {
    alert("Logging in with Google");
  };

  const handleForgotPassword = () => {
    alert("Redirecting to Forgot Password page");
  };

  return (
    <Modal
      open={openModal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableScrollLock={true}
    >
      <Box className="modal-style">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 4 }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          {error && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              gutterBottom
            >
              {error}
            </Typography>
          )}

          <CustomTextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            type="email"
            required
            fullWidth
          />
          <CustomTextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            type="password"
            required
            fullWidth
          />
          <Button variant="contained" type="submit" color="primary" fullWidth>
            Log In
          </Button>

          <Link
            component="button"
            type="button"
            onClick={handleForgotPassword}
            variant="body2"
            sx={{ alignSelf: "center" }}
          >
            Forgot your password?
          </Link>

          <Divider sx={{ marginTop: 2, marginBottom: 2 }}>or</Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </Button>

          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <Link
              variant="body2"
              component="button"
              type="button"
              sx={{ alignSelf: "center" }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}

export default LoginModal;
