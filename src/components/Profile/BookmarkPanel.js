import React from "react";
import { useRouter } from "next/router";
import PostCard from "../PostCard";

function BookmarkPanel({ bookmarks }) {
  const router = useRouter();

  const handleClick = (postId) => {
    router.push(`/answers/${postId}`);
  }

  return (
    <div>
      {bookmarks.map((bookmark) => (
        <PostCard
          key={bookmark.id}
          title={bookmark.title}
          question={bookmark.question}
          onClick={() => handleClick(bookmark.id)}
        />
      ))}
    </div>
  );
}

export default BookmarkPanel;
