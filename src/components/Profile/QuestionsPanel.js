import React, { useState } from "react";
import { useRouter } from "next/router";
import PostCard from "../PostCard";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PostSkeleton from "../Skeleton/PostSkeleton";

function QuestionsPanel({ loading, answeredQuestions, unansweredQuestions }) {
  const router = useRouter();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const redirectAnswer = (postId) => {
    router.push(`/answers/${postId}`);
  }

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          bgcolor: "#fff",
          borderRadius: "10px",
          py: 1,
          marginBottom: "15px",
        }}
      >
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Answered questions" />
          <Tab label="Unanswered questions" />
        </Tabs>
      </Box>

      {loading ? (
        <div>
          {[...Array(5)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      ) : value === 0 ? (
        answeredQuestions.length > 0 ? (
          answeredQuestions.map((q, i) => (
            <PostCard
              key={i}
              title={q.title}
              question={q.question}
              onClick={() => redirectAnswer(q.id)}
            />
          ))
        ) : (
          <div className="no-posts">No answered questions</div>
        )
      ) : value === 1 ? (
        unansweredQuestions.length > 0 ? (
          unansweredQuestions.map((q, i) => (
            <PostCard
              key={i}
              title={q.title}
              question={q.question}
              onClick={q.onClick}
            />
          ))
        ) : (
          <div className="no-posts">No unanswered questions</div>
        )
      ) : null}
    </div>
  );
}

export default QuestionsPanel;
