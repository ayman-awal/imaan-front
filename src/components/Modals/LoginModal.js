import React from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useAuth } from "@/context/AuthContext";

function LoginModal({ openModal, closeModal }) {
  const { login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    }
  };
  return (
    <Modal
      open={openModal}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-style">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            variant="outlined"
            type="email"
            required
            fullWidth
          />
          <TextField
            label="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            variant="outlined"
            type="password"
            required
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default LoginModal;
