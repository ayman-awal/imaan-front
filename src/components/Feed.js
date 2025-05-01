import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import { useRouter } from "next/router";
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
    <div className="container">
      <div className="textbox" onClick={handleOpen}>
        <p style={{ fontSize: "18px" }}>Ask a question anonymously...</p>
      </div>
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
    </div>
  );
};

export default Feed;
