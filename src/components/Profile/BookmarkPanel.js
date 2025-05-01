import React from "react";
import { useRouter } from "next/router";
import PostCard from "../PostCard";
import { Card } from "@mui/material";

function BookmarkPanel({ bookmarks }) {
  const router = useRouter();

  const handleClick = (postId) => {
    router.push(`/answers/${postId}`);
  };

  return (
    <div>
      {/* <Card sx={{ p: 3, maxWidth: "100%", mx: "auto" }}> */}
      {bookmarks.map((bookmark) => (
        <PostCard
          key={bookmark.id}
          title={bookmark.title}
          question={bookmark.question}
          onClick={() => handleClick(bookmark.id)}
        />
      ))}
    </div>
    // {/* </Card> */}
  );
}

export default BookmarkPanel;
