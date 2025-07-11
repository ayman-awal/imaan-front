import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LoginModal from "./modals/LoginModal";

const EmailVerification = () => {
  const router = useRouter();
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [executed, setExecuted] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => setOpenModal(false);

  useEffect(() => {
    const token = router.query.token;

    if (!token || executed) return;

    setExecuted(true);

    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email?token=${token}`
        );
        setStatus(response.status === 200 ? "success" : "error");
      } catch (err) {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [router.query.token]);


  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Card sx={{ p: 4, textAlign: "center", boxShadow: 3, maxWidth: 500 }}>
        <CardContent>
          {status === "loading" && (
            <>
              <CircularProgress />
              <Typography sx={{ mt: 2 }}>Verifying your email...</Typography>
            </>
          )}
          {status === "success" && (
            <>
              <CheckCircleOutlineIcon sx={{ fontSize: 60, color: "green", mb: 2 }} />
              <Typography variant="h5" gutterBottom>Email Verified Successfully!</Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Thank you for verifying your email. You can now log in to your account.
              </Typography>
              <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
                Go to Login
              </Button>
            </>
          )}
          {status === "error" && (
            <>
              <ErrorOutlineIcon sx={{ fontSize: 60, color: "red", mb: 2 }} />
              <Typography variant="h5" gutterBottom>Verification Failed</Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                The verification link is invalid or has expired.
              </Typography>
              <Button variant="contained" color="primary" onClick={() => router.push("/resend-verification")}>
                Resend Verification Email
              </Button>
            </>
          )}
        </CardContent>
      </Card>
      <LoginModal openModal={openModal} closeModal={closeModal} />
    </Box>
  );
};

export default EmailVerification;
