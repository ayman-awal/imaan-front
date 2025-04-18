import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import SkeletonPostCard from "./SkeletonPostCard";
import SnackbarComponent from "./SnackbarComponent";
import PostSkeleton from "./Skeleton/PostSkeleton";

const Feed = () => {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("imaanToken") : null;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
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

  const createPost = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/post`,
        {
          title,
          question,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 201) {
        setSnackbar({
          open: true,
          message: "Question posted successfully",
          severity: "success",
        });
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (postId) => {
    router.push(`/answers/${postId}`);
  };

  return (
    <div className="container">
      <div className="textbox" onClick={handleOpen}>
        <p style={{ fontSize: "18px" }}>Write your question...</p>
      </div>
      {/* <PostSkeleton /> */}
      {loading ? (
        <div>
          {[...Array(5)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="no-posts">No posts available</div>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-style">
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <TextField
              required
              id="standard-basic"
              label="Title"
              onChange={(e) => setTitle(e.target.value)}
              variant="standard"
              style={{ width: "100%" }}
            />

            <TextField
              required
              id="outlined-multiline-static"
              label="Question"
              onChange={(e) => {
                const value = e.target.value;
                const words = value.trim().split(/\s+/);
                if (words.length <= 150) {
                  setQuestion(value);
                }
              }}
              multiline
              minRows={6}
              maxRows={15}
              style={{ width: "100%" }}
            />
            <span>
              {question.trim() === ""
                ? 0
                : question.trim().split(/\s+/).length <= 150
                ? question.trim().split(/\s+/).length
                : 150}
              /150 words
            </span>
            <Button variant="contained" onClick={createPost}>
              Post
            </Button>
          </Box>
        </Box>
      </Modal>
      <SnackbarComponent
        message={snackbar.message}
        severity={snackbar.severity}
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
};

export default Feed;
