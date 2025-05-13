import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import { useRouter } from "next/router";
import { Box, Typography, Container } from "@mui/material";
import NoDataMessage from "./common/NoDataMessage";
import SnackbarComponent from "./common/SnackbarComponent";
import PostSkeleton from "./skeleton/PostSkeleton";
import AskQuestionModal from "./modals/AskQuestionModal";

const Feed = () => {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("imaanToken") : null;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleOpen = () => {
    if (!token) {
      setSnackbar({
        open: true,
        message: "Please login to ask a question.",
        severity: "error",
      });
      return;
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/feed`
        );

        setPosts(response.data.posts);
      } catch (error) {
        console.log("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleClick = (postId) => {
    router.push(`/answers/${postId}`);
  };

  return (
    <Container maxWidth="md" sx={{ padding: "10px" }}>
      <Box
        onClick={handleOpen}
        sx={{
          display: "block",
          padding: "16px 20px",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          fontSize: "16px",
          color: "#666",
          cursor: "pointer",
          userSelect: "none",
          transition: "all 0.2s ease-in-out",
          marginY: "30px",
          "&:hover": {
            borderColor: "#aaa",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            backgroundColor: "#fefefe",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            margin: 0,
            color: "#444",
            fontWeight: 500,
          }}
        >
          Ask a question anonymously...
        </Typography>
      </Box>
      {loading ? (
        <Container disableGutters>
          {[...Array(5)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </Container>
      ) : posts.length === 0 ? (
        <NoDataMessage message="No posts available" />
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            question={post.question}
            onClick={() => handleClick(post.id)}
          />
        ))
      )}

      <AskQuestionModal
        open={open}
        handleClose={handleClose}
        token={token}
        setSnackbar={setSnackbar}
      />

      <SnackbarComponent
        message={snackbar.message}
        severity={snackbar.severity}
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Container>
  );
};

export default Feed;
