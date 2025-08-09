// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Container,
//   CircularProgress,
//   Alert,
//   IconButton,
//   Tooltip,
//   Stack,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
// import { useAuth } from "@/context/AuthContext";

// const Answer = ({ postId }) => {
//   const { isLoggedIn } = useAuth();
//   const router = useRouter();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saved, setSaved] = useState();
//   const [error, setError] = useState(null);

//   const checkBookmark = async (postId, token) => {
//     const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/check-bookmark/${postId}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     return res.data?.isBookmarked;
//   };

//   useEffect(() => {
//     if (!postId) return;
//     const token = localStorage.getItem("imaanToken");
//     const fetchPost = async () => {
//       try {
//         const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`);
        
//         if(res.status == 200) {
//           setPost(res.data.post);

//           if(isLoggedIn){
//             const isBookmarked = await checkBookmark(postId, token);
//             setSaved(isBookmarked);
//           }

//         } else {
//           throw new Error("Post not found.");
//         }
//       } catch (err) {
//         setError(err.message || "Error fetching post.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [postId]);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(post?.answer || "");
//   };

//   if (loading) {
//     return (
//       <Container maxWidth="md" sx={{ mt: 12, textAlign: "center" }}>
//         <CircularProgress />
//         <Typography variant="body2" mt={2}>
//           Loading content...
//         </Typography>
//       </Container>
//     );
//   }

//   if (error || !post) {
//     return (
//       <Container maxWidth="sm" sx={{ mt: 12 }}>
//         <Alert severity="error">{error || "Post not found."}</Alert>
//       </Container>
//     );
//   }

//   const handleBack = () => {
//     router.back();
//   };

//   const handleSave = async () => {
//     if(!isLoggedIn){
//       return;
//     }
    
//     const token = localStorage.getItem("imaanToken");

//     let endpoint = saved ? "unbookmark" : "bookmark";

//     try {
//       const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts/${endpoint}/${postId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
  
//       if (res.status === 200) {
//         setSaved(!saved);
//       }
//     } catch (error) {
//       console.error("Bookmark toggle failed:", error.message);
//     }
//   }

//   return (
//     <Container maxWidth="md" sx={{ py: 5 }}>
//       <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
//         <IconButton onClick={handleBack} sx={{ marginRight: 2 }}>
//           <ArrowBackIcon />
//         </IconButton>

//         <Typography
//           variant="h4"
//           component="h1"
//           sx={{
//             fontWeight: 700,
//             color: "#1a1a1a",
//             lineHeight: 1.4,
//           }}
//         >
//           {post.title}
//         </Typography>
//       </Box>

//       <Box
//         sx={{
//           background: "rgba(255,255,255,0.8)",
//           border: "1px solid #eaeaea",
//           boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
//           borderRadius: "20px",
//           px: { xs: 4, md: 6 },
//           py: { xs: 5, md: 5 },
//           backdropFilter: "blur(8px)",
//         }}
//       >
//         <Box sx={{ mb: 5 }}>
//           <Typography
//             variant="subtitle2"
//             sx={{
//               mb: 1,
//               color: "#666",
//               textTransform: "uppercase",
//               fontSize: "0.85rem",
//             }}
//           >
//             Question
//           </Typography>
//           <Box
//             sx={{
//               border: "1px solid #ddd",
//               backgroundColor: "#fdfdfd",
//               borderRadius: "10px",
//               px: 3,
//               py: 2.5,
//               fontSize: "1.05rem",
//               lineHeight: "1.7",
//               fontWeight: 500,
//               color: "#333",
//             }}
//           >
//             {post.question}
//           </Box>
//         </Box>

//         <Box>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               variant="subtitle2"
//               sx={{
//                 mb: 1,
//                 color: "#666",
//                 textTransform: "uppercase",
//                 fontSize: "0.85rem",
//               }}
//             >
//               Answer
//             </Typography>
//           </Box>

//           <Box
//             sx={{
//               border: "1px solid #d6f5d6",
//               backgroundColor: "#f4fff4",
//               borderRadius: "10px",
//               px: 3,
//               py: 2.5,
//               fontSize: "1.1rem",
//               lineHeight: 1.7,
//               color: "#666",
//               whiteSpace: "pre-line",
//             }}
//           >
//             {post.answer || "No answer yet."}
//           </Box>

//           <Stack direction="row" spacing={1} justifyContent="flex-end" mt={2}>
//             <Tooltip title="Copy Answer">
//               <IconButton onClick={handleCopy} size="small">
//                 <ContentCopyIcon fontSize="small" />
//               </IconButton>
//             </Tooltip>

//             <Tooltip title={saved ? "Unsave post" : "Save post"}>
//               <IconButton size="medium" onClick={handleSave}>
//                 {saved ? (
//                   <BookmarkIcon fontSize="medium" />
//                 ) : (
//                   <BookmarkBorderIcon fontSize="medium" />
//                 )}
//               </IconButton>
//             </Tooltip>

//           </Stack>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Answer;

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
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useAuth } from "@/context/AuthContext";

const Answer = ({ postId }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState();
  const [error, setError] = useState(null);

  const checkBookmark = async (postId, token) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/check-bookmark/${postId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data?.isBookmarked;
  };

  useEffect(() => {
    if (!postId) return;
    const token = localStorage.getItem("imaanToken");
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`);
        if (res.status === 200) {
          setPost(res.data.post);
          if (isLoggedIn) {
            const isBookmarked = await checkBookmark(postId, token);
            setSaved(isBookmarked);
          }
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

  const handleSave = async () => {
    if (!isLoggedIn) {
      return;
    }
    const token = localStorage.getItem("imaanToken");
    let endpoint = saved ? "unbookmark" : "bookmark";
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${endpoint}/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        setSaved(!saved);
      }
    } catch (error) {
      console.error("Bookmark toggle failed:", error.message);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: { xs: 3, sm: 5 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: { xs: 2, sm: 3 },
        }}
      >
        <IconButton
          onClick={handleBack}
          sx={{ marginRight: 2, p: { xs: 0.5, sm: 1 } }}
          aria-label="go back"
          size="medium"
        >
          <ArrowBackIcon fontSize="medium" />
        </IconButton>

        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: 700,
            color: "#1a1a1a",
            lineHeight: 1.3,
            fontSize: { xs: "1.5rem", sm: "2rem" },
            wordBreak: "break-word",
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
          px: { xs: 3, sm: 6 },
          py: { xs: 3, sm: 5 },
          backdropFilter: "blur(8px)",
        }}
      >
        <Box sx={{ mb: { xs: 3, sm: 5 } }}>
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
              fontSize: { xs: "1rem", sm: "1.05rem" },
              lineHeight: "1.7",
              fontWeight: 500,
              color: "#333",
              wordBreak: "break-word",
              whiteSpace: "pre-line",
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

          <Box
            sx={{
              border: "1px solid #d6f5d6",
              backgroundColor: "#f4fff4",
              borderRadius: "10px",
              px: 3,
              py: 2.5,
              fontSize: { xs: "1rem", sm: "1.1rem" },
              lineHeight: 1.7,
              color: "#666",
              whiteSpace: "pre-line",
              wordBreak: "break-word",
            }}
          >
            {post.answer || "No answer yet."}
          </Box>

          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-end"
            mt={2}
            sx={{ flexWrap: "wrap" }}
          >
            <Tooltip title="Copy Answer">
              <IconButton onClick={handleCopy} size="small" aria-label="copy answer">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title={saved ? "Unsave post" : "Save post"}>
              <IconButton size="medium" onClick={handleSave} aria-label="save post">
                {saved ? (
                  <BookmarkIcon fontSize="medium" />
                ) : (
                  <BookmarkBorderIcon fontSize="medium" />
                )}
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Answer;
