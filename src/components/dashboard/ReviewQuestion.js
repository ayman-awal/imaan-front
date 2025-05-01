import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  TextField,
  Button,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SnackbarComponent from "@/components/common/SnackbarComponent";
import { useRouter } from "next/router";
import axios from "axios";

function ReviewQuestion({ postId }) {
  const router = useRouter();
  // const token = localStorage.getItem("imaanToken");
  const [token, setToken] = useState("");
  const [label, setLabel] = useState("");
  const [answer, setAnswer] = useState("");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    // if (!postId || !token) return;

    const token = localStorage.getItem("imaanToken");
    setToken(token);

    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/unpublished/${postId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const post = response.data.post;
        if (post) {
          setPost(post);
          setAnswer(post.answer || "");
          setLabel(post.answer ? "" : "Type your answer...");
        } else {
          throw new Error("Post not found.");
        }
      } catch (error) {
        console.error(error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDraftAnswer = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/answer/${postId}`,
        { answer },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSnackbar({
        open: true,
        message: "Draft saved successfully",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (answer == "") {
      setSnackbar({
        open: true,
        message: "Answer cannot be blank",
        severity: "error",
      });
    } else {
      try {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/status/${postId}`,
          { status: "published" },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          setSnackbar({
            open: true,
            message: "Answer submitted",
            severity: "success",
          });
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 12, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body2" mt={2}>
          Loading post...
        </Typography>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="sm" sx={{ mt: 12 }}>
        <Alert severity="error">Post not found.</Alert>
      </Container>
    );
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={handleBack} sx={{ marginRight: 2 }}>
          <ArrowBackIcon />
        </IconButton>

        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            color: "#1a1a1a",
            lineHeight: 1.4,
          }}
        >
          {post.title}
        </Typography>
      </Box>

      <Box
        sx={{
          background: "rgba(255,255,255,0.8)",
          border: "1px solid #eaeaea",
          boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
          borderRadius: "20px",
          px: { xs: 4, md: 6 },
          py: { xs: 5, md: 5 },
          backdropFilter: "blur(8px)",
        }}
      >
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1,
              color: "#666",
              textTransform: "uppercase",
              fontSize: "0.85rem",
            }}
          >
            Question
          </Typography>
          <Box
            sx={{
              border: "1px solid #ddd",
              backgroundColor: "#fdfdfd",
              borderRadius: "10px",
              px: 3,
              py: 2.5,
              fontSize: "1.05rem",
              fontWeight: 500,
              color: "#333",
            }}
          >
            {post.question}
          </Box>
        </Box>

        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              mb: 1,
              color: "#666",
              textTransform: "uppercase",
              fontSize: "0.85rem",
            }}
          >
            Answer
          </Typography>
          <TextField
            multiline
            minRows={6}
            maxRows={15}
            label={label}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            sx={{
              width: "100%",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
              "& .MuiInputBase-root": {
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "var(--primary-color)",
                whiteSpace: "pre-line",
              },
            }}
          />

          <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handleDraftAnswer}
              sx={{
                textTransform: "none",
                px: 4,
                backgroundColor: "var(--primary-color)",
                color: "#fff",
              }}
            >
              Save Draft
            </Button>
            <Button
              variant="outlined"
              color="var(--primary-color)"
              onClick={handleSubmit}
              sx={{
                textTransform: "none",
                px: 4,
                backgroundColor: "#fff",
                color: "var(--primary-color)",
              }}
            >
              Submit
            </Button>
          </Box>
          <Typography
            variant="caption"
            gutterBottom
            sx={{ display: "block" }}
            mt={1}
          >
            Save answer as draft before submitting...
          </Typography>
        </Box>
      </Box>

      <SnackbarComponent
        message={snackbar.message}
        severity={snackbar.severity}
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Container>
  );
}

export default ReviewQuestion;
