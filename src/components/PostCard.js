import React from "react";
import LongMenu from "./LongMenu";
import { useAuth } from "@/context/AuthContext";

function PostCard({ title, question, onClick }) {
  const { isAdmin } = useAuth();
  return (
    <div onClick={onClick} className="post-card">
      {isAdmin ? (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <LongMenu />
        </div>
      ) : null}

      <h3 className="post-card-title">{title}</h3>
      <p className="post-card-question">{question}</p>
    </div>
  );
}

export default PostCard;
