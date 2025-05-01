import React from "react";
import LongMenu from "./LongMenu";
import { useAuth } from "@/context/AuthContext";
import { Link } from "@mui/material";

function PostCard({ title, question, onClick }) {
  const { isAdmin } = useAuth();
  return (
    <div onClick={onClick} className="post-card">
      {isAdmin ? (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <LongMenu />
        </div>
      ) : null}

      <h3 className="post-card-title">
        {title.length > 85 ? <>{title.substr(0, 85)} ...</> : <>{title}</>}
      </h3>
      <p className="post-card-question">
        {question.length > 180 ? (
          <>
            {question.substr(0, 180)}
            <Link
              component="button"
              sx={{
                fontSize: "0.875rem",
                color: "#007BFF",
                paddingLeft: 0.5,
                display: "inline-block",
                textDecoration: "none",
                fontWeight: 400,
              }}
            >
              ...read more
            </Link>
          </>
        ) : (
          <>{question}</>
        )}
      </p>
    </div>
  );
}

export default PostCard;
