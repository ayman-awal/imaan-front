import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Answer = ({ postId }) => {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`
        );
        if (res.data?.post) {
          setPost(res.data.post);
        } else {
          throw new Error("Post not found.");
        }
      } catch (err) {
        setError(err.message || "Error fetching post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(post?.answer || "");
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 12, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body2" mt={2}>
          Loading content...
        </Typography>
      </Container>
    );
  }

  if (error || !post) {
    return (
      <Container maxWidth="sm" sx={{ mt: 12 }}>
        <Alert severity="error">{error || "Post not found."}</Alert>
      </Container>
    );
  }

  const handleBack = () => {
    router.back();
  };


  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <IconButton onClick={handleBack} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Box
        sx={{
          background: "rgba(255,255,255,0.8)",
          border: "1px solid #eaeaea",
          boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
          borderRadius: "20px",
          px: { xs: 4, md: 6 },
          py: { xs: 5, md: 7 },
          backdropFilter: "blur(8px)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 4,
            lineHeight: 1.4,
            color: "#1a1a1a",
          }}
        >
          {post.title}
        </Typography>

        <Box sx={{ mb: 5 }}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 1, color: "#666", textTransform: "uppercase", fontSize: "0.85rem" }}
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
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1, color: "#666", textTransform: "uppercase", fontSize: "0.85rem" }}
            >
              Answer
            </Typography>
            <Tooltip title="Copy Answer">
              <IconButton onClick={handleCopy} size="small">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            sx={{
              border: "1px solid #d6f5d6",
              backgroundColor: "#f4fff4",
              borderRadius: "10px",
              px: 3,
              py: 2.5,
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: "#1e4620",
              whiteSpace: "pre-line",
              // fontFamily: "system-ui",
            }}
          >
            {post.answer || "No answer yet."}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Answer;
