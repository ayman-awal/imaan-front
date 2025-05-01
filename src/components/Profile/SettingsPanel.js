import React, { useState } from "react";
import axios from "axios";
import SnackbarComponent from "../common/SnackbarComponent";
import { Card, Box, Typography, Divider, Button } from "@mui/material";
import CustomTextField from "../CustomTextField";

function SettingsPanel() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSubmit = async () => {
    const token = localStorage.getItem("imaanToken");
    
    try {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setSnackbar({
          open: true,
          message: "Please enter all fields",
          severity: "error",
        });
        return;
      }

      if (confirmPassword != newPassword) {
        setSnackbar({
          open: true,
          message: "New password and confirm password do not match.",
          severity: "error",
        });
        return;
      } else {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/users/change-password`,
          { currentPassword: currentPassword, newPassword: newPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status == 200) {
          setSnackbar({
            open: true,
            message: "Password changed successfully",
            severity: "success",
          });

          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card sx={{ p: 3, maxWidth: "100%", mx: "auto" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Change password
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Your password must be at least 6 characters and include a combination
          of numbers, letters, and special characters.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" flexDirection="column" gap={2}>
          <CustomTextField
            label="Current password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            variant="outlined"
            type="password"
            required
            fullWidth
          />

          <CustomTextField
            label="New password"
            onChange={(e) => setNewPassword(e.target.value)}
            variant="outlined"
            type="password"
            required
            fullWidth
          />

          <CustomTextField
            label="Confirm new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            type="password"
            required
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Change Password
          </Button>
        </Box>
      </Card>

      {/* <Card sx={{ p: 3, maxWidth: "100%", mx: "auto", mt: 5 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Personal Details
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" flexDirection="column" gap={2}></Box>
      </Card> */}
      <SnackbarComponent
        message={snackbar.message}
        severity={snackbar.severity}
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
}

export default SettingsPanel;
