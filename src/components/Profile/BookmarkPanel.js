import React from "react";
import { useRouter } from "next/router";
import PostCard from "../PostCard";
import { Box } from "@mui/material";

function BookmarkPanel({ bookmarks }) {
  const router = useRouter();

  const handleClick = (postId) => {
    router.push(`/answers/${postId}`);
  };

  return (
    <Box>
      {bookmarks.map((bookmark) => (
        <PostCard
          key={bookmark.id}
          title={bookmark.title}
          question={bookmark.question}
          onClick={() => handleClick(bookmark.id)}
        />
      ))}
    </Box>
  );
}

export default BookmarkPanel;
